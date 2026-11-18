import { notFound } from "next/navigation";
import { getCourseBySlug, courses } from "@/data/courses";
import { buildMeta, buildCourseSchema, buildCourseBreadcrumbSchema } from "@/lib/seo";
import CourseDetailClient from "./CourseDetailClient";

/**
 * Pre-generate all course pages at build time for maximum SEO performance.
 * When a new course is added to courses.js it gets its own static page on next deploy.
 */
export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

/**
 * Per-course server-side metadata — title, description, OG image, canonical URL.
 * Google can now read proper titles/descriptions for every course page.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return { title: "Course Not Found" };
  }

  return buildMeta({
    title: course.metaTitle || course.title,
    description: course.metaDescription ||
      `${course.description} | ${course.duration} Data Science & Analytics program at NIDADS, Delhi. Enroll now for career-focused training with live projects and placement support.`,
    path: `/course/${course.slug}`,
    ogImage: course.image?.startsWith("http") ? course.image : undefined,
    keywords: [
      ...(course.seoKeywords || []),
      course.title,
      "diploma in data science and ai",
      "diploma in data science",
      "data science and ai course",
      "b tech in ai and data science",
      "ai and data science courses in india",
      "master in ai ml and data science",
    ],
  });
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const courseSchema = buildCourseSchema(course);
  const breadcrumbSchema = buildCourseBreadcrumbSchema(course);

  return (
    <>
      {/* Product structured data for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {/* BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Interactive client component (tabs, enroll popup, etc.) */}
      <CourseDetailClient course={course} />
    </>
  );
}
