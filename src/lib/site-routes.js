/**
 * CENTRAL SITE ROUTES CONFIG
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the ONLY file you need to edit when adding a new static page.
 * Both the XML sitemap (/sitemap.xml) and the HTML sitemap (/sitemap-page)
 * read from this list automatically.
 *
 * Fields:
 *   path     — the URL path, e.g. "/about"
 *   label    — human-readable page name shown in the HTML sitemap
 *   section  — groups pages in the HTML sitemap (e.g. "Main", "Legal")
 *   priority — SEO priority 0.0–1.0 (default 0.8 if omitted)
 *   changeFreq — "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const STATIC_ROUTES = [
  // ── Main pages ────────────────────────────────────────────────────────────
  {
    path: "/",
    label: "Home",
    section: "Main Pages",
    priority: 1.0,
    changeFreq: "weekly",
    icon: "🏠",
  },
  {
    path: "/about",
    label: "About Us",
    section: "Main Pages",
    priority: 0.8,
    changeFreq: "monthly",
    icon: "🏛️",
  },
  {
    path: "/course",
    label: "All Courses",
    section: "Main Pages",
    priority: 0.9,
    changeFreq: "weekly",
    icon: "📚",
  },
  {
    path: "/blog",
    label: "Blog",
    section: "Main Pages",
    priority: 0.9,
    changeFreq: "daily",
    icon: "✍️",
  },
  {
    path: "/contact-us",
    label: "Contact Us",
    section: "Main Pages",
    priority: 0.7,
    changeFreq: "monthly",
    icon: "📬",
  },

  // ── Special course landing pages ──────────────────────────────────────────
  {
    path: "/course/degree-program-in-ai",
    label: "Degree Program in AI",
    section: "Special Programs",
    priority: 0.9,
    changeFreq: "weekly",
    icon: "🎓",
  },
  {
    path: "/course/pg-program-in-ai",
    label: "PG Program in AI",
    section: "Special Programs",
    priority: 0.9,
    changeFreq: "weekly",
    icon: "🎓",
  },

  // ── Legal ─────────────────────────────────────────────────────────────────
  {
    path: "/privacy-policy",
    label: "Privacy Policy",
    section: "Legal",
    priority: 0.4,
    changeFreq: "yearly",
    icon: "🔒",
  },
  {
    path: "/disclaimer",
    label: "Disclaimer",
    section: "Legal",
    priority: 0.4,
    changeFreq: "yearly",
    icon: "📄",
  },

  // ── Sitemap itself ─────────────────────────────────────────────────────────
  {
    path: "/sitemap-page",
    label: "Sitemap",
    section: "Legal",
    priority: 0.3,
    changeFreq: "weekly",
    icon: "🗺️",
  },
];
