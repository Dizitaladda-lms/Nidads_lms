/**
 * ONE-STEP DATABASE MIGRATION SCRIPT (TABLES + DATA)
 * ─────────────────────────────────────────────────────────────────
 * Creates the "Blog" & "AdminAudit" tables (if they don't exist yet)
 * and transfers all blogs + audit records from blog-export.json
 * into the target DATABASE_URL.
 *
 * Usage:
 *   1. Update DATABASE_URL in .env to your NEW database URL
 *      (or pass it directly: node migrate-to-new-db.mjs "postgresql://...")
 *   2. Run: node migrate-to-new-db.mjs
 */
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, existsSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '.env.local'), override: true });

const targetDbUrl = process.argv[2] || process.env.NEW_DATABASE_URL || process.env.DATABASE_URL;

if (!targetDbUrl) {
  console.error('❌ No DATABASE_URL found. Please set DATABASE_URL in .env or pass it as an argument.');
  process.exit(1);
}

const exportPath = path.join(__dirname, 'blog-export.json');
if (!existsSync(exportPath)) {
  console.error('❌ blog-export.json not found. Run `node export-blogs.mjs` first.');
  process.exit(1);
}

const exportData = JSON.parse(readFileSync(exportPath, 'utf-8'));
const { blogs = [], audits = [] } = exportData;

console.log('=== ONE-STEP NEW DB MIGRATION (TABLES + DATA) ===');
console.log('Target DB Host:', new URL(targetDbUrl).hostname);
console.log(`Loaded backup: ${blogs.length} blogs, ${audits.length} audit logs\n`);

const prisma = new PrismaClient({
  datasources: { db: { url: targetDbUrl } },
});

try {
  // Step 1: Create tables & indexes in new DB
  console.log('1️⃣  Creating tables ("Blog" and "AdminAudit") in target DB...');
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Blog" (
      "id" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "content" TEXT NOT NULL,
      "coverImg" TEXT,
      "ogImage" TEXT,
      "metaTitle" TEXT,
      "metaDescription" TEXT,
      "publisher" TEXT,
      "authorName" TEXT,
      "authorRole" TEXT,
      "authorBio" TEXT,
      "authorImage" TEXT,
      "category" TEXT,
      "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
      "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
      "schema" JSONB,
      "faqSchema" JSONB,
      "schemas" JSONB[] DEFAULT ARRAY[]::JSONB[],
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "Blog_slug_key" ON "Blog"("slug");
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "AdminAudit" (
      "id" TEXT NOT NULL,
      "action" TEXT NOT NULL,
      "entity" TEXT,
      "entityId" TEXT,
      "actor" TEXT,
      "ip" TEXT,
      "metadata" JSONB,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "AdminAudit_pkey" PRIMARY KEY ("id")
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "AdminAudit_action_createdAt_idx" ON "AdminAudit"("action", "createdAt");
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "AdminAudit_entity_entityId_idx" ON "AdminAudit"("entity", "entityId");
  `);
  console.log('   ✔ Tables & indexes created/verified!\n');

  // Step 2: Upsert all blogs
  console.log(`2️⃣  Transferring ${blogs.length} blogs...`);
  let importedBlogs = 0;
  for (const blog of blogs) {
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
    importedBlogs++;
    console.log(`   ✅ [${importedBlogs}/${blogs.length}] ${blog.title}`);
  }

  // Step 3: Upsert all audit logs
  console.log(`\n3️⃣  Transferring ${audits.length} AdminAudit records...`);
  let importedAudits = 0;
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
      importedAudits++;
    } catch {}
  }

  const totalBlogsInNewDb = await prisma.blog.count();
  const totalAuditsInNewDb = await prisma.adminAudit.count();

  console.log('\n🎉 MIGRATION SUCCESSFUL!');
  console.log(`   Total Blogs in New DB:  ${totalBlogsInNewDb}`);
  console.log(`   Total Audits in New DB: ${totalAuditsInNewDb}`);
} catch (error) {
  console.error('\n❌ Migration failed:', error.message);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
