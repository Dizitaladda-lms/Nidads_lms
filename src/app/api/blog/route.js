import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { generateUniqueSlug } from "@/lib/slugify";
import { normalizeTags } from "@/lib/tags";
import { ensureAdminApi } from "@/lib/auth";
import { recordAudit } from "@/lib/audit";
import { getClientIp } from "@/lib/request-info";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";

const DEFAULT_LIMIT = 9;
const MAX_LIMIT = 24;
const LIST_SELECT = {
  title: true,
  slug: true,
  coverImg: true,
  category: true,
  tags: true,
  createdAt: true,
  updatedAt: true,
};

const extractJsonLdFromScriptTag = (raw) => {
  const trimmed = raw.trim();
  if (!/^<script\b/i.test(trimmed)) return trimmed;

  const matches = [...trimmed.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
  if (matches.length > 1) {
    throw new Error("Multiple <script> blocks found. Add each JSON-LD as a separate schema entry.");
  }
  if (matches.length === 1) {
    return (matches[0][1] || "").trim();
  }

  return trimmed
    .replace(/^<script\b[^>]*>/i, "")
    .replace(/<\/script>\s*$/i, "")
    .trim();
};

const parseSchemaJson = (input) => {
  if (input === undefined || input === null) return null;
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) return null;

    const normalized = extractJsonLdFromScriptTag(trimmed);
    if (/"image"\s*:\s*,/.test(normalized)) {
      throw new Error(
        'Invalid schema JSON: "image" is missing a value. Remove the "image" line or set it to a URL string.'
      );
    }
    try {
      return JSON.parse(normalized);
    } catch (error) {
      throw new Error(`Invalid schema JSON: ${error.message || "Unable to parse"}`);
    }
  }
  if (typeof input === "object") {
    return input;
  }
  throw new Error("Invalid schema JSON");
};

const parseSchemasArray = (schemas) => {
  if (!Array.isArray(schemas)) return [];

  const parsed = [];
  for (let i = 0; i < schemas.length; i++) {
    const schema = schemas[i];
    if (!schema || (typeof schema === "string" && !schema.trim())) {
      continue;
    }

    try {
      const parsedSchema = parseSchemaJson(schema);
      if (parsedSchema) {
        parsed.push(parsedSchema);
      }
    } catch (error) {
      throw new Error(`Schema ${i + 1}: ${error.message}`);
    }
  }

  return parsed;
};

const sanitizeContent = (html) => {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/\sstyle=\"[^\"]*\"/gi, "")
    .replace(/\sstyle='[^']*'/gi, "")
    .replace(/<\/?font[^>]*>/gi, "")
    .replace(/\sid=\"docs-internal-guid-[^\"]*\"/gi, "");
};

export async function GET(request) {
  try {
    const session = await ensureAdminApi(request, { requireCsrf: false });
    if (!session) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limitParam = Number(searchParams.get("limit")) || DEFAULT_LIMIT;
    const limit = Math.min(Math.max(limitParam, 1), MAX_LIMIT);
    const search = searchParams.get("search")?.trim();
    const tag = searchParams.get("tag")?.trim();
    const category = searchParams.get("category")?.trim();
    const relatedTo = searchParams.get("relatedTo")?.trim();
    const excludeId = searchParams.get("excludeId")?.trim();

    const filters = [];
    const excludedIds = [];

    if (search) {
      filters.push({
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
          { tags: { has: search.toLowerCase() } },
          { keywords: { has: search.toLowerCase() } },
        ],
      });
    }

    if (tag) {
      filters.push({ tags: { has: tag.toLowerCase() } });
    }

    if (category) {
      // Match by category field first, then fall back to tags/title/content
      const words = category.toLowerCase().split(/\s+/).filter(Boolean);
      filters.push({
        OR: [
          // Primary: exact category column match (case-insensitive)
          { category: { equals: category, mode: "insensitive" } },
          // tags: hasSome matches if any word from the category is in the tags array
          { tags: { hasSome: words } },
          // title contains the full category phrase (case-insensitive)
          { title: { contains: category, mode: "insensitive" } },
          // content search
          { content: { contains: category, mode: "insensitive" } },
        ],
      });
    }

    if (excludeId) {
      excludedIds.push(excludeId);
    }

    if (relatedTo) {
      const reference = await prisma.blog.findUnique({
        where: { slug: relatedTo },
        select: { id: true, tags: true, category: true },
      });

      if (reference) {
        excludedIds.push(reference.id);

        const orConditions = [];
        // Match by category (most relevant)
        if (reference.category) {
          orConditions.push({
            category: { equals: reference.category, mode: "insensitive" },
          });
        }
        // Also match by shared tags
        if (reference.tags?.length) {
          orConditions.push({ tags: { hasSome: reference.tags } });
        }

        if (orConditions.length) {
          filters.push({ OR: orConditions });
        }
        // If no conditions (no category, no tags), just return latest (fallback below)
      }
    }

    if (excludedIds.length) {
      filters.push({ id: { notIn: excludedIds } });
    }

    const where = filters.length ? { AND: filters } : undefined;

    const skip = (page - 1) * limit;

    let [items, count] = await Promise.all([
      prisma.blog.findMany({
        where,
        select: LIST_SELECT,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.blog.count({ where }),
    ]);

    // Fallback: if relatedTo was requested but no related posts found,
    // return the latest blogs (excluding the current one) so the sidebar
    // is never empty.
    let isFallback = false;
    if (relatedTo && items.length === 0) {
      const fallbackWhere = excludedIds.length
        ? { id: { notIn: excludedIds } }
        : undefined;
      items = await prisma.blog.findMany({
        where: fallbackWhere,
        select: LIST_SELECT,
        orderBy: { createdAt: "desc" },
        take: limit,
      });
      count = items.length;
      isFallback = true;
    }

    return NextResponse.json({
      data: items,
      isFallback,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.max(1, Math.ceil(count / limit)),
      },
    });
  } catch (error) {
    console.error("GET /api/blog failed", error);
    return NextResponse.json({
      data: [],
      isFallback: true,
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 1,
      },
    });
  }
}

export async function POST(request) {
  try {
    const session = await ensureAdminApi(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await request.json();
    const {
      title,
      content,
      coverImg,
      ogImage,
      metaTitle,
      metaDescription,
      publisher,
      category,
      tags,
      keywords,
      slug,
      schemas,
      // Backward compat (older UI)
      schema,
      faqSchema,
    } = payload;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const finalSlug = await generateUniqueSlug(slug || title);
    const preparedCategory = category?.trim() || null;
    if (preparedCategory && !BLOG_CATEGORIES.includes(preparedCategory)) {
      return NextResponse.json({ error: "Invalid blog category" }, { status: 400 });
    }
    const preparedTags = normalizeTags(tags);

    const preparedKeywords = normalizeTags(keywords);
    let preparedSchemas = [];
    let preparedSchema = null;
    let preparedFaqSchema = null;

    try {
      preparedSchemas = parseSchemasArray(schemas);
      preparedSchema = parseSchemaJson(schema);
      preparedFaqSchema = parseSchemaJson(faqSchema);

      if (preparedSchema) preparedSchemas.push(preparedSchema);
      if (preparedFaqSchema) preparedSchemas.push(preparedFaqSchema);
    } catch (error) {
      return NextResponse.json({ error: error.message || "Invalid schemas" }, { status: 400 });
    }

    const blog = await prisma.blog.create({
      data: {
        title: title.trim(),
        content: sanitizeContent(content),
        coverImg: coverImg?.trim() || null,
        ogImage: ogImage?.trim() || null,
        metaTitle: metaTitle?.trim() || null,
        metaDescription: metaDescription?.trim() || null,
        publisher: publisher?.trim() || "Team Nidads",
        category: preparedCategory,
        tags: preparedTags,
        keywords: preparedKeywords,
        schema: preparedSchema,
        faqSchema: preparedFaqSchema,
        schemas: preparedSchemas,
        slug: finalSlug,
      },
    });
    revalidateTag("blogs", "max");

    const ip = await getClientIp(request);
    await recordAudit("blog.create", {
      actor: session.sub,
      entity: "Blog",
      entityId: blog.id,
      ip,
      metadata: { title: blog.title, slug: blog.slug },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("POST /api/blog failed", error);
    return NextResponse.json({ error: "Unable to create blog" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await ensureAdminApi(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const payload = await request.json().catch(() => ({}));
    const id = searchParams.get("id") || payload.id;
    const slug = searchParams.get("slug") || payload.slug;

    if (!id && !slug) {
      return NextResponse.json({ error: "Blog id or slug is required" }, { status: 400 });
    }

    const deleted = await prisma.blog.delete({
      where: id ? { id } : { slug },
    });
    revalidateTag("blogs", "max");
    const ip = await getClientIp(request);
    await recordAudit("blog.delete", {
      actor: session.sub,
      entity: "Blog",
      entityId: deleted.id,
      ip,
      metadata: { title: deleted.title, slug: deleted.slug },
    });

    return NextResponse.json({ success: true, id: deleted.id, slug: deleted.slug });
  } catch (error) {
    console.error("DELETE /api/blog failed", error);
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Unable to delete blog" }, { status: 500 });
  }
}
