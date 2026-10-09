import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import BlogCard from "@/components/BlogCard";
import BlogThemeToggle from "@/components/BlogThemeToggle";
import Link from "next/link";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";
import "@/styles/blog.css";

/* ─── Cache public blog listings to keep the index fast and reduce DB churn ─── */
export const revalidate = 300;

export const metadata = {
  title: "Data Science & Analytics Course – Learn in 2026",
  description: "Master data science and data analytics with hands-on projects and real datasets. Learn Python, SQL & ML. Free certificate. Start today!",
  alternates: {
    canonical: "https://www.nidads.com/blog",
  },
  keywords: [
    "data science",
    "data analytics",
    "what is data science",
    "business intelligence",
    "python for data science",
    "data science vs data analytics",
    "big data analytics",
    "best data analytics tools 2026",
    "data analytics salary in India",
    "AI and Data Science Blog",
    "Machine Learning Blog",
  ],
};

const CATEGORIES = BLOG_CATEGORIES.map((category) => ({ label: category, value: category }));

const getCachedBlogListing = unstable_cache(
  async (page, search, category) => {
    const limit = 12;
    const filters = [];

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

    if (category) {
      filters.push({ category: { equals: category, mode: "insensitive" } });
    }

    const where = filters.length ? { AND: filters } : undefined;
    const [data, count] = await Promise.all([
      prisma.blog.findMany({
        where,
        select: {
          title: true,
          slug: true,
          coverImg: true,
          category: true,
          tags: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blog.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.max(1, Math.ceil(count / limit)),
      },
    };
  },
  ["public-blog-listing"],
  { revalidate: 300, tags: ["blogs"] }
);

/* ─── data fetch — select only the columns BlogCard actually needs ─ */
const fetchBlogs = async (searchParams) => {
  const params = searchParams || {};
  const page = Number(params.page) || 1;
  const limit = 12;
  const search = params.search?.trim();
  const category = params.category?.trim();

  try {
    return await getCachedBlogListing(page, search || "", category || "");
  } catch (error) {
    console.error("Unable to fetch blog posts from the database", error);
    return {
      data: [],
      error: true,
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 1,
      },
    };
  }
};

/* ─────────────────────────────────────────────── page ── */

export default async function BlogPage({ searchParams }) {
  const params = (await searchParams) || {};
  const page = Number(params.page) || 1;
  const searchQuery = params.search || "";
  const activeCategory = params.category || "";

  const data = await fetchBlogs({ ...params, page });

  return (
    <div className="blog-page" data-theme="light">
      <main id="main-content" className="blog-index blog-index--simple" role="main">

        {/* ── Compact header ── */}
        <header className="blog-simple-header">

          {/* Top row: eyebrow + theme toggle side by side */}
          <div className="blog-simple-header__top">
            <p className="blog-index__eyebrow">
              <span className="blog-index__eyebrow-dot" />
              Stories &amp; Updates
            </p>
            <BlogThemeToggle />
          </div>

          {/* Headline */}
          <h1>
            Insights that move <span className="blog-index__hero-accent">data forward</span>
          </h1>
          <p className="blog-simple-header__sub">
            Explore our latest articles, tips, and industry insights on data science and analytics.
          </p>
          <div className="blog-index__hero-tags">
            <span className="blog-index__hero-tag">📊 Data Science</span>
            <span className="blog-index__hero-tag">📈 Analytics</span>
            <span className="blog-index__hero-tag">💡 Guides</span>
          </div>

          {/* ── Search + category pills in one bar ── */}
          <div className="blog-simple-controls">
            <form
              className="blog-simple-search"
              action="/blog"
              method="GET"
              role="search"
              aria-label="Blog search"
            >
              {activeCategory && (
                <input type="hidden" name="category" value={activeCategory} />
              )}
              <input
                type="search"
                name="search"
                placeholder="Search articles…"
                defaultValue={searchQuery}
                aria-label="Search blog posts"
              />
              <button type="submit">Search</button>
            </form>

            <nav className="blog-cat-bar" aria-label="Filter by category">
              <Link
                href="/blog"
                className={`blog-cat-pill${!activeCategory ? " blog-cat-pill--active" : ""}`}
              >
                All
              </Link>
              {CATEGORIES.map(({ label, value }) => (
                <Link
                  key={value}
                  href={`/blog?category=${encodeURIComponent(value)}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`}
                  className={`blog-cat-pill${activeCategory === value ? " blog-cat-pill--active" : ""}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Active filter chip */}
          {activeCategory && (
            <div className="blog-filter-bar">
              <span className="blog-filter-chip">
                Category: <strong>{activeCategory}</strong>
                <Link href="/blog" className="blog-filter-chip__clear" aria-label="Clear filter">×</Link>
              </span>
            </div>
          )}
        </header>

        {data?.error ? (
          <div className="blog-error">
            <p>Unable to load blog posts right now. Please try again later.</p>
          </div>
        ) : data?.data?.length ? (
          <div className="blog-grid blog-grid--three-col">
            {data.data.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="blog-empty">
            <div className="blog-empty__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p>No posts found.</p>
            {activeCategory && (
              <Link href="/blog" className="blog-empty__reset">View all posts</Link>
            )}
          </div>
        )}

        {/* ── Pagination ── */}
        {data?.pagination?.totalPages > 1 && (
          <nav className="pagination" aria-label="Pagination">
            {Array.from({ length: data.pagination.totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === data.pagination.page;
              const paramsClone = new URLSearchParams(params);
              paramsClone.set("page", pageNumber.toString());
              return (
                <Link
                  key={pageNumber}
                  href={`/blog?${paramsClone.toString()}`}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "pagination__link pagination__link--active"
                      : "pagination__link"
                  }
                >
                  {pageNumber}
                </Link>
              );
            })}
          </nav>
        )}

      </main>
    </div>
  );
}
