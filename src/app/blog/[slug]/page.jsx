import Image from "next/image";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { getBaseUrl } from "@/lib/base-url";
import BlogBackGuard from "@/components/BlogBackGuard";
import BlogEnquiryForm from "@/components/BlogEnquiryForm";
import BlogThemeToggle from "@/components/BlogThemeToggle";
import "@/styles/blog.css";

export const revalidate = 300;

const BLOG_SELECT = {
  id: true,
  title: true,
  slug: true,
  content: true,
  coverImg: true,
  ogImage: true,
  metaTitle: true,
  metaDescription: true,
  publisher: true,
  category: true,
  tags: true,
  keywords: true,
  schema: true,
  faqSchema: true,
  schemas: true,
  createdAt: true,
  updatedAt: true,
};

const LIST_SELECT = {
  id: true,
  title: true,
  slug: true,
  coverImg: true,
  category: true,
  tags: true,
  createdAt: true,
  updatedAt: true,
};

const decodeHeadingText = (value) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:amp;)?nbsp;|&#160;|&#xA0;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/\s+/g, " ")
    .trim();

const createHeadingId = (text, index) => {
  const id = text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return id || `heading-${index}`;
};

const prepareBlogContent = (html) => {
  const headings = [];
  const usedIds = new Set();
  let headingIndex = 0;
  const normalizedHtml = html.replace(/&(?:amp;)?nbsp;|&#160;|&#xA0;/gi, " ");

  const content = normalizedHtml.replace(
    /<h([12])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
    (match, level, attributes = "", innerHtml) => {
      const title = decodeHeadingText(innerHtml);
      if (!title) return match;

      const existingId = attributes.match(/\sid=["']([^"']+)["']/i)?.[1];
      const baseId = existingId || createHeadingId(title, headingIndex + 1);
      let id = baseId;
      let suffix = 2;
      while (usedIds.has(id)) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
      }
      usedIds.add(id);
      headingIndex += 1;

      const attributesWithoutId = attributes.replace(/\sid=["'][^"']*["']/i, "");
      headings.push({ id, level: Number(level), title });

      return `<h${level}${attributesWithoutId} id="${id}">${innerHtml}</h${level}>`;
    }
  );

  return { content, headings };
};

const fetchBlog = async (slug) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      select: BLOG_SELECT,
    });
    return { blog };
  } catch (error) {
    console.error("fetchBlog request failed", error);
    return { error: true };
  }
};

const fetchRelated = async (slug, blogId) => {
  try {
    const reference = await prisma.blog.findUnique({
      where: { slug },
      select: { id: true, tags: true, category: true },
    });

    if (!reference) {
      return { data: [], isFallback: true };
    }

    const filters = [];
    const excludedIds = [reference.id];

    if (blogId) excludedIds.push(blogId);

    if (reference.category) {
      filters.push({ category: { equals: reference.category, mode: "insensitive" } });
    }
    if (reference.tags?.length) {
      filters.push({ tags: { hasSome: reference.tags } });
    }

    const where = filters.length
      ? { AND: [{ id: { notIn: excludedIds } }, { OR: filters }] }
      : { id: { notIn: excludedIds } };

    const data = await prisma.blog.findMany({
      where,
      select: LIST_SELECT,
      orderBy: { createdAt: "desc" },
      take: 4,
    });

    return { data, isFallback: data.length === 0 };
  } catch (error) {
    console.error("fetchRelated request failed", error);
    return { data: [], isFallback: true };
  }
};

export async function generateMetadata(props) {
  const params = await props?.params;
  const slug = params?.slug;
  const blogResult = slug ? await fetchBlog(slug) : {};
  const blog = blogResult.blog;

  if (!blog) {
    return {
      title: blogResult.error ? "Blog unavailable" : "Post Not Found",
    };
  }

  const baseUrl = await getBaseUrl();

  // Use metaTitle if available, otherwise use title
  const metaTitle = blog.metaTitle?.trim() || blog.title;

  // Use metaDescription if available, otherwise extract from content
  const metaDescription = blog.metaDescription?.trim() ||
    blog.content.replace(/<[^>]+>/g, " ").trim().slice(0, 160);

  // Use ogImage if available, otherwise use coverImg
  const imageUrl = blog.ogImage?.trim() || blog.coverImg?.trim();
  const isExternalImage = Boolean(imageUrl && /^(https?:)?\/\//i.test(imageUrl));
  const ogImage = imageUrl
    ? isExternalImage
      ? imageUrl
      : new URL(imageUrl, baseUrl).toString()
    : undefined;

  const canonical = new URL(`/blog/${blog.slug}`, baseUrl).toString();

  // Generate image alt text
  const imageAlt = `Cover image for ${blog.title}`;

  const resolvedKeywords = Array.isArray(blog.keywords) && blog.keywords.length ? blog.keywords : blog.tags || [];

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [
        {
          url: ogImage,
          alt: imageAlt,
        }
      ] : undefined,
      type: "article",
      url: canonical,
      siteName: "NIDADS",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [
        {
          url: ogImage,
          alt: imageAlt,
        }
      ] : undefined,
    },
    keywords: resolvedKeywords,
    other: {
      publisher: blog.publisher?.trim() || "Team Nidads",
    },
    alternates: { canonical },
  };
}

export default async function BlogDetails(props) {
  const params = await props?.params;
  const slug = params?.slug;
  const blogResult = slug ? await fetchBlog(slug) : {};
  const blog = blogResult.blog;

  if (blogResult.error) {
    return (
      <div className="blog-page" data-theme="light">
        <main id="main-content" className="blog-detail" role="main">
          <div className="blog-error">
            <h1>Blog unavailable</h1>
            <p>We&apos;re unable to load this article right now. Please try again later.</p>
          </div>
        </main>
      </div>
    );
  }

  if (!blog) {
    notFound();
  }

  const related = await fetchRelated(slug, blog.id);
  const cover = blog.coverImg?.trim();
  const isExternalCover = Boolean(cover && /^(https?:)?\/\//i.test(cover));
  const hasCover = Boolean(cover);
  const imageSrc = hasCover ? cover : "/placeholder.svg";
  const isPlaceholder = !hasCover;

  const baseUrl = await getBaseUrl();
  const canonical = `${baseUrl}/blog/${blog.slug}`;
  const { content: blogContent, headings } = prepareBlogContent(blog.content);

  const schemas = [];
  if (Array.isArray(blog.schemas)) {
    for (const schema of blog.schemas) {
      if (schema && typeof schema === "object") schemas.push(schema);
    }
  }
  if (blog.schema && typeof blog.schema === "object") schemas.push(blog.schema);
  if (blog.faqSchema && typeof blog.faqSchema === "object") schemas.push(blog.faqSchema);

  const fallbackJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    url: canonical,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt ?? blog.createdAt,
    author: {
      "@type": "Person",
      name: "Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: blog.publisher?.trim() || "Team Nidads",
    },
    image: hasCover
      ? isExternalCover
        ? imageSrc
        : new URL(imageSrc, baseUrl).toString()
      : undefined,
    description: blog.content.replace(/<[^>]+>/g, " ").slice(0, 160),
  };

  return (
    <div className="blog-page" data-theme="light">
      <main id="main-content" className="blog-detail" role="main">
        {/* Intercepts browser back/forward to force hard reload instead of
          React DOM reconciliation — prevents insertBefore crash from
          SEO browser extensions modifying the DOM */}
        <BlogBackGuard />
        <BlogThemeToggle />
        <div className="blog-detail__layout">
          {/* ── Main article column ── */}
          <article className="blog-detail__main" aria-labelledby="blog-title">
            <header>
              <p className="eyebrow">{new Date(blog.createdAt).toLocaleDateString()}</p>
              {blog.category ? (
                <span className="blog-category-chip">{blog.category}</span>
              ) : null}
              <h1 id="blog-title">{blog.title}</h1>
            </header>

            <div className={`cover${isPlaceholder ? " cover--placeholder" : ""}`}>
              <Image
                src={imageSrc}
                alt={blog.title}
                fill
                sizes="(max-width: 900px) 100vw, 780px"
                priority
                quality={80}
                loading="eager"
                style={{ objectFit: "cover" }}
                unoptimized={isExternalCover}
              />
              {isPlaceholder ? <span className="cover__hint">Upload a cover image from the admin panel.</span> : null}
            </div>

            {headings.length ? (
              <details className="blog-toc">
                <summary>Table of contents</summary>
                <nav aria-label="Table of contents">
                  <ol>
                    {headings.map((heading) => (
                      <li key={heading.id} className={`blog-toc__item--h${heading.level}`}>
                        <a href={`#${heading.id}`}>{heading.title}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </details>
            ) : null}

            <div className="content" dangerouslySetInnerHTML={{ __html: blogContent }} />
          </article>

          {/* ── Sidebar column ── */}
          <aside className="blog-detail__sidebar">
            {/* Recommended / Latest posts */}
            {related?.data?.length ? (
              <div className="sidebar-card sidebar-recommended">
                <p className="sidebar-card__label">
                  {related.isFallback ? "Latest Posts" : "Recommended Posts"}
                </p>
                <ul className="sidebar-recommended__list">
                  {related.data.map((item) => {
                    const rawCover = item.coverImg?.trim();
                    const hasImg = Boolean(rawCover);
                    const isExt = Boolean(rawCover && /^(https?:)?\/\//i.test(rawCover));
                    return (
                      <li key={item.id}>
                        <a href={`/blog/${item.slug}`} className="sidebar-recommended__item">
                          <div className="sidebar-recommended__thumb">
                            <Image
                              src={hasImg ? rawCover : "/placeholder.svg"}
                              alt={item.title}
                              fill
                              sizes="72px"
                              quality={75}
                              loading="lazy"
                              style={{ objectFit: "cover" }}
                              unoptimized={isExt}
                            />
                          </div>
                          <div className="sidebar-recommended__info">
                            <span className="sidebar-recommended__title">{item.title}</span>
                            {item.category ? (
                              <span className="sidebar-recommended__cat">{item.category}</span>
                            ) : item.tags?.length ? (
                              <span className="sidebar-recommended__cat">{item.tags[0]}</span>
                            ) : null}
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            {/* ── Enquiry form — right sidebar, between category and recommended ── */}
            <div className="sidebar-card sidebar-enquiry-form">
              <BlogEnquiryForm compact={true} />
            </div>
            {/* Category card */}
            {blog.category ? (
              <div className="sidebar-card sidebar-category">
                <p className="sidebar-card__label">Category</p>
                <a
                  href={`/blog?category=${encodeURIComponent(blog.category)}`}
                  className="sidebar-category__chip"
                >
                  {blog.category}
                </a>
                <p className="sidebar-card__hint">Browse all posts in this category</p>
              </div>
            ) : null}



            {/* Tags card */}
            {blog.tags?.length ? (
              <div className="sidebar-card sidebar-tags">
                <p className="sidebar-card__label">Tags</p>
                <div className="sidebar-tags__list">
                  {blog.tags.map((tag) => (
                    <a
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="sidebar-tag"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>

        {/* JSON-LD structured data — placed at end so SEO browser extensions
          that move <script type="application/ld+json"> tags don't break
          React's DOM reconciliation on back-navigation */}
        {schemas.length
          ? schemas.map((schema, index) => (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          ))
          : (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(fallbackJsonLd) }}
            />
          )}
      </main>
    </div>
  );
}
