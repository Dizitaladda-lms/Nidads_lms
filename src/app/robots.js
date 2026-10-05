/**
 * Next.js App Router robots.txt generator.
 * Accessible at: https://www.nidads.com/robots.txt
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "BingPreview", allow: "/" },
    ],
    sitemap: "https://www.nidads.com/sitemap.xml",
  };
}
