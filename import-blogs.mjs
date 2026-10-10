/**
 * SAFE BLOG & AUDIT DATA IMPORT SCRIPT
 * ─────────────────────────────────────────────────────────────────
 * Reads blog-export.json (created by export-blogs.mjs from old DB)
 * and inserts all records into the NEW database (DATABASE_URL).
 *
 * Usage:
 *   1. Run: node export-blogs.mjs (against old DB)
 *   2. Put NEW DATABASE_URL in .env (or pass NEW_DATABASE_URL env var)
 *   3. Run: npm run db:push   (creates Blog & AdminAudit tables in new DB)
 *   4. Run: node import-blogs.mjs (transfers all data into new DB)
 */
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, existsSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '.env.local'), override: true });

const DRY_RUN = process.env.DRY_RUN === 'true';
const targetDbUrl = process.env.NEW_DATABASE_URL || process.env.DATABASE_URL;
const exportPath = path.join(__dirname, 'blog-export.json');

if (!existsSync(exportPath)) {
  console.error('❌ blog-export.json not found. Run `node export-blogs.mjs` first.');
  process.exit(1);
}

const exportData = JSON.parse(readFileSync(exportPath, 'utf-8'));
const { blogs = [], audits = [], blogCount = 0 } = exportData;

console.log('=== BLOG & AUDIT DATA IMPORT ===');
console.log(`Source DB Host: ${exportData.sourceHost}`);
console.log(`Target DB Host: ${new URL(targetDbUrl || 'postgresql://x').hostname}`);
console.log(`Blogs to import: ${blogCount} | Audits to import: ${audits.length}`);
console.log(`Dry run: ${DRY_RUN}\n`);

if (DRY_RUN) {
  console.log('[DRY RUN] Would import:');
  blogs.forEach((b, i) => console.log(`  [${i + 1}] "${b.title}" (slug: ${b.slug})`));
  process.exit(0);
}

const prisma = new PrismaClient({
  datasources: { db: { url: targetDbUrl } },
});

try {
  const existingCount = await prisma.blog.count();
  console.log(`Target DB currently has: ${existingCount} blogs`);

  let imported = 0;
  let skipped = 0;

  for (const blog of blogs) {
    try {
      await prisma.blog.upsert({
        where: { slug: blog.slug },
        update: {
          title: blog.title,
          content: blog.content,
          coverImg: blog.coverImg || null,
          ogImage: blog.ogImage || null,
          metaTitle: blog.metaTitle || null,
          metaDescription: blog.metaDescription || null,
          publisher: blog.publisher || null,
          authorName: blog.authorName || null,
          authorRole: blog.authorRole || null,
          authorBio: blog.authorBio || null,
          authorImage: blog.authorImage || null,
          category: blog.category || null,
          tags: blog.tags || [],
          keywords: blog.keywords || [],
          schema: blog.schema || null,
          faqSchema: blog.faqSchema || null,
          schemas: blog.schemas || [],
        },
        create: {
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          content: blog.content,
          coverImg: blog.coverImg || null,
          ogImage: blog.ogImage || null,
          metaTitle: blog.metaTitle || null,
          metaDescription: blog.metaDescription || null,
          publisher: blog.publisher || null,
          authorName: blog.authorName || null,
          authorRole: blog.authorRole || null,
          authorBio: blog.authorBio || null,
          authorImage: blog.authorImage || null,
          category: blog.category || null,
          tags: blog.tags || [],
          keywords: blog.keywords || [],
          schema: blog.schema || null,
          faqSchema: blog.faqSchema || null,
          schemas: blog.schemas || [],
          createdAt: new Date(blog.createdAt),
          updatedAt: new Date(blog.updatedAt),
        },
      });
      console.log(`✅ [${++imported}/${blogs.length}] Imported: "${blog.title}"`);
    } catch (e) {
      console.error(`❌ Failed: "${blog.title}" — ${e.message}`);
      skipped++;
    }
  }

  let auditsImported = 0;
  for (const audit of audits) {
    try {
      await prisma.adminAudit.upsert({
        where: { id: audit.id },
        update: {},
        create: {
          id: audit.id,
          action: audit.action,
          entity: audit.entity || null,
          entityId: audit.entityId || null,
          actor: audit.actor || null,
          ip: audit.ip || null,
          metadata: audit.metadata || null,
          createdAt: new Date(audit.createdAt),
        },
      });
      auditsImported++;
    } catch {}
  }

  const finalCount = await prisma.blog.count();
  console.log(`\n✅ Migration complete!`);
  console.log(`   Blogs imported: ${imported} | Errors: ${skipped}`);
  console.log(`   Audit logs imported: ${auditsImported}`);
  console.log(`   Target DB now has: ${finalCount} blogs`);
} catch (e) {
  console.error('❌ Import failed:', e.message);
} finally {
  await prisma.$disconnect();
}
