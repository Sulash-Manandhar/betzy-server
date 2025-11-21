import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx src/seed/index.ts",
  },
  engine: "classic",
  datasource: {
    url: "postgresql://macbookair:@localhost:5432/betzy_db?schema=public&pgbouncer=true",
  },
});
