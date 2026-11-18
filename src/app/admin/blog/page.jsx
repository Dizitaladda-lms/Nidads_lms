import Link from "next/link";
import DeleteBlogButton from "@/components/DeleteBlogButton";
import prisma from "@/lib/prisma";

const fetchBlogs = async () =>
  prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));

export default async function AdminBlogPage() {
  let blogs = [];
  let databaseUnavailable = false;
  try {
    blogs = await fetchBlogs();
  } catch (error) {
    databaseUnavailable = true;
  }

  return (
    <section className="admin-panel">
      <header className="admin-panel__header">
        <div>
          <p className="eyebrow">Content Hub</p>
          <h1>Blogs</h1>
          <p>Manage every article powering your multi-site deployments from a single dashboard.</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <a href="/api/blog/export-doc" className="btn" download>
            📥 Export All Blogs (.doc)
          </a>
          <Link href="/admin/blog/create" className="btn btn--primary">
            + New Post
          </Link>
        </div>
      </header>

      {databaseUnavailable ? (
        <p className="empty">
          Database connection failed. Update <code>DATABASE_URL</code> in your environment and restart the dev server.
        </p>
      ) : blogs.length ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Post</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <p className="admin-table__title">{blog.title}</p>
                  <p className="admin-table__meta">{formatDate(blog.createdAt)}</p>
                </td>
                <td>{blog.tags?.length ? blog.tags.join(", ") : "—"}</td>
                <td className="admin-table__actions">
                  <Link href={`/blog/${blog.slug}`} className="btn btn--ghost" target="_blank" rel="noreferrer">
                    View
                  </Link>
                  <a href={`/api/blog/export-doc?id=${blog.id}`} className="btn btn--ghost" download>
                    Export .doc
                  </a>
                  <Link href={`/admin/blog/edit/${blog.id}`} className="btn">
                    Edit
                  </Link>
                  <DeleteBlogButton id={blog.id} title={blog.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="empty">No posts yet. Click “+ New Post” to publish your first article.</p>
      )}
    </section>
  );
}
