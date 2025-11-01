import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: [
      { level: "query", emit: "event" },
      { level: "error", emit: "event" },
      { level: "warn", emit: "event" },
    ],
  });
};

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  globalThis.prisma ?? prismaClientSingleton();

// Log database queries in development
if (process.env.NODE_ENV === "development") {
  prisma.$on("query", (e: any) => {
    logger.debug("Query: " + e.query);
    logger.debug("Duration: " + e.duration + "ms");
  });
}

prisma.$on("error", (e: any) => {
  logger.error("Database error:", e);
});

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
