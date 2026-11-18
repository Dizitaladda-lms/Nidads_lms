import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/blog/categories
 *
 * Returns all distinct, non-null categories used across published blogs,
 * together with the count of posts in each category.
 *
 * Response shape:
 * [
 *   { category: "Data Analytics", count: 12 },
 *   { category: "Data Science",   count: 8 },
 *   ...
 * ]
 */
export async function GET() {
  try {
    // Fetch all non-null categories and group by value
    const rows = await prisma.blog.groupBy({
      by: ["category"],
      where: { category: { not: null } },
      _count: { category: true },
      orderBy: { _count: { category: "desc" } },
    });

    const categories = rows
      .filter((r) => r.category) // extra safety filter
      .map((r) => ({ category: r.category, count: r._count.category }));

    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET /api/blog/categories failed", error);
    // Gracefully return empty list (e.g., if category column not yet migrated)
    return NextResponse.json([]);
  }
}
