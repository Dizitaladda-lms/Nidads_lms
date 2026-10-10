import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig, env } from "prisma/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, ".env.local"), override: true });

// Build URL from env to ensure all pgBouncer params are included
const rawUrl = process.env.DATABASE_URL || "";
if (!process.env.DIRECT_URL && rawUrl) {
  process.env.DIRECT_URL = rawUrl;
}
// Ensure pgbouncer and statement_cache_size are set for pooler connections
let dbUrl = rawUrl;
try {
  const u = new URL(rawUrl);
  if (u.hostname.includes("pooler.supabase.com")) {
    u.searchParams.set("pgbouncer", "true");
    u.searchParams.set("statement_cache_size", "0");
    u.searchParams.set("connection_limit", "1");
    dbUrl = u.toString();
  }
} catch {}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: dbUrl,
  },
});
