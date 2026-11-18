import { notFound } from "next/navigation";
import BlogForm from "@/components/BlogForm";
import prisma from "@/lib/prisma";

const fetchBlog = async (id) =>
  prisma.blog.findUnique({
    where: { id },
  });

export const metadata = {
  title: "Edit Blog Post",
};

export default async function EditBlogPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  if (!id) {
    notFound();
  }

  let blog = null;
  let fetchError = false;

  try {
    blog = await fetchBlog(id);
  } catch (error) {
    console.error("Admin blog edit load failed", error);
    fetchError = true;
  }

  if (!blog) {
    if (fetchError) {
      return (
        <section className="admin-panel">
          <p className="empty">
            Unable to load blog details. Please check your database connection and try again.
          </p>
        </section>
      );
    }
    notFound();
  }

  return (
    <section className="admin-panel">
      <BlogForm mode="edit" initialData={blog} />
    </section>
  );
}
