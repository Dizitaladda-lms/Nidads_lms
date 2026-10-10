import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getSchemasList(blog) {
  const list = [];
  if (Array.isArray(blog.schemas) && blog.schemas.length > 0) {
    for (const s of blog.schemas) {
      if (!s) continue;
      list.push(typeof s === "object" ? JSON.stringify(s, null, 2) : String(s));
    }
  } else {
    if (blog.schema) {
      list.push(typeof blog.schema === "object" ? JSON.stringify(blog.schema, null, 2) : String(blog.schema));
    }
    if (blog.faqSchema) {
      list.push(typeof blog.faqSchema === "object" ? JSON.stringify(blog.faqSchema, null, 2) : String(blog.faqSchema));
    }
  }
  return list;
}

function renderBlogFormSectionHtml(blog, index = null) {
  const tagsStr = Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "";
  const keywordsStr = Array.isArray(blog.keywords) ? blog.keywords.join(", ") : blog.keywords || "";
  const schemasList = getSchemasList(blog);
  const headingPrefix = index !== null ? `Blog #${index + 1}: ` : "";

  return `
    <div class="blog-post-wrapper" style="page-break-after: always; margin-bottom: 40px;">
      <h1 style="font-size: 22pt; color: #0f172a; border-bottom: 3px solid #0284c7; padding-bottom: 8px; margin-bottom: 16px;">
        ${escapeHtml(headingPrefix + (blog.title || "Untitled Blog"))}
      </h1>

      <h2 style="font-size: 14pt; color: #0369a1; margin-top: 20px; margin-bottom: 10px;">
        1. Blog Form Fields (Copy &amp; Paste into Form)
      </h2>

      <table border="1" cellspacing="0" cellpadding="8" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-family: Arial, sans-serif; font-size: 10.5pt;">
        <tbody>
          <tr>
            <td style="width: 28%; font-weight: bold; background-color: #f1f5f9; color: #1e293b;">Title</td>
            <td style="width: 72%; color: #0f172a;">${escapeHtml(blog.title || "")}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f1f5f9; color: #1e293b;">Slug</td>
            <td style="color: #0f172a; font-family: Consolas, monospace;">${escapeHtml(blog.slug || "")}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f1f5f9; color: #1e293b;">Meta Title (SEO)</td>
            <td style="color: #0f172a;">${escapeHtml(blog.metaTitle || "")}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f1f5f9; color: #1e293b;">Meta Description (SEO)</td>
            <td style="color: #0f172a;">${escapeHtml(blog.metaDescription || "")}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f1f5f9; color: #1e293b;">Publisher</td>
            <td style="color: #0f172a;">${escapeHtml(blog.publisher || "Team Nidads")}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f1f5f9; color: #1e293b;">Author Name</td>
            <td style="color: #0f172a;">${escapeHtml(blog.authorName || blog.publisher || "Team Nidads")}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f1f5f9; color: #1e293b;">Author Role</td>
            <td style="color: #0f172a;">${escapeHtml(blog.authorRole || "")}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f1f5f9; color: #1e293b;">Author Bio</td>
            <td style="color: #0f172a;">${escapeHtml(blog.authorBio || "")}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f1f5f9; color: #1e293b;">Author Photo URL</td>
            <td style="color: #0284c7; word-break: break-all;">${escapeHtml(blog.authorImage || "")}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f1f5f9; color: #1e293b;">Category</td>
            <td style="color: #0f172a;">${escapeHtml(blog.category || "")}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f1f5f9; color: #1e293b;">Tags (Comma-separated)</td>
            <td style="color: #0f172a;">${escapeHtml(tagsStr)}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f1f5f9; color: #1e293b;">Keywords (SEO)</td>
            <td style="color: #0f172a;">${escapeHtml(keywordsStr)}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f1f5f9; color: #1e293b;">Cover Image URL</td>
            <td style="color: #0284c7; word-break: break-all;">${escapeHtml(blog.coverImg || "")}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f1f5f9; color: #1e293b;">OG Image URL (Social Sharing)</td>
            <td style="color: #0284c7; word-break: break-all;">${escapeHtml(blog.ogImage || "")}</td>
          </tr>
        </tbody>
      </table>

      <h2 style="font-size: 14pt; color: #0369a1; margin-top: 24px; margin-bottom: 10px;">
        2. Structured Data Schemas (JSON-LD)
      </h2>
      ${
        schemasList.length === 0
          ? `<p style="color: #64748b; font-style: italic;">No schemas added.</p>`
          : schemasList
              .map(
                (schemaStr, idx) => `
          <div style="margin-bottom: 14px;">
            <p style="font-weight: bold; margin-bottom: 4px; color: #1e293b;">Schema ${idx + 1}:</p>
            <pre style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; font-family: Consolas, monospace; font-size: 9pt; white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(schemaStr)}</pre>
          </div>
        `
              )
              .join("")
      }

      <h2 style="font-size: 14pt; color: #0369a1; margin-top: 24px; margin-bottom: 10px;">
        3. Content (Rich Text — Copy &amp; Paste Directly into Blog Editor)
      </h2>
      <div class="blog-rich-content" style="border: 1px solid #cbd5e1; padding: 18px; background-color: #ffffff; font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.6; color: #0f172a;">
        ${blog.content || "<p><em>No content</em></p>"}
      </div>
    </div>
  `;
}

function wrapInWordDocument(title, bodyHtml) {
  return `\ufeff<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <style>
    @page { size: 21cm 29.7cm; margin: 2cm; }
    body { font-family: Arial, Calibri, sans-serif; font-size: 11pt; color: #0f172a; line-height: 1.5; }
    table { border-collapse: collapse; width: 100%; margin: 10px 0; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; vertical-align: top; }
    th { background-color: #f1f5f9; font-weight: bold; }
    h1 { font-size: 20pt; color: #0f172a; margin-top: 16pt; margin-bottom: 8pt; }
    h2 { font-size: 15pt; color: #1e293b; margin-top: 14pt; margin-bottom: 6pt; }
    h3 { font-size: 13pt; color: #334155; margin-top: 12pt; margin-bottom: 4pt; }
    h4 { font-size: 11.5pt; color: #475569; margin-top: 10pt; margin-bottom: 4pt; }
    p { margin-top: 0; margin-bottom: 8pt; }
    ul, ol { margin-top: 4pt; margin-bottom: 8pt; padding-left: 24pt; }
    li { margin-bottom: 4pt; }
    a { color: #0284c7; text-decoration: underline; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  ${bodyHtml}
</body>
</html>`;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const blog = await prisma.blog.findUnique({ where: { id } });
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      const docContent = wrapInWordDocument(blog.title, renderBlogFormSectionHtml(blog, null));
      const safeSlug = (blog.slug || "blog").replace(/[^a-z0-9-_]/gi, "_");

      return new NextResponse(docContent, {
        status: 200,
        headers: {
          "Content-Type": "application/msword; charset=utf-8",
          "Content-Disposition": `attachment; filename="${safeSlug}.doc"`,
        },
      });
    }

    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });

    const combinedBody = blogs.map((blog, idx) => renderBlogFormSectionHtml(blog, idx)).join("\n");
    const docContent = wrapInWordDocument("All NIDADS Blogs - Form Export", combinedBody);

    return new NextResponse(docContent, {
      status: 200,
      headers: {
        "Content-Type": "application/msword; charset=utf-8",
        "Content-Disposition": `attachment; filename="ALL-NIDADS-BLOGS.doc"`,
      },
    });
  } catch (error) {
    console.error("GET /api/blog/export-doc failed", error);
    return NextResponse.json({ error: "Failed to export blog document" }, { status: 500 });
  }
}
