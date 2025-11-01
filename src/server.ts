import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import type { IncomingMessage, Server, ServerResponse } from "node:http";

const app = createApp();

const gracefulShutdown = async (
  server: Server<typeof IncomingMessage, typeof ServerResponse>,
  signal: NodeJS.Signals
) => {
  logger.info(`${signal} received, closing server gracefully...`);
  server.close(async () => {
    logger.info("HTTP server closed");
    process.exit(0);
  });
  setTimeout(() => {
    logger.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000);
};

const startServer = async () => {
  try {
    const server = app.listen(env.PORT, () => {
      logger.info(
        `🚀 Server running on port ${env.PORT} in ${env.NODE_ENV} mode`
      );
      logger.info(`📝 Logs level: ${env.LOG_LEVEL.toLocaleUpperCase()}`);
      logger.info(`🚀 Server Status: http://localhost:${env.PORT}/health`);
      logger.info(
        `📘 Swagger docs available at http://localhost:${env.PORT}/api-docs`
      );
    });

    process.on("SIGTERM", () => gracefulShutdown(server, "SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown(server, "SIGINT"));
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
