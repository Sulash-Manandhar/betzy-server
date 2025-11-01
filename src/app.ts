import { clerkMiddleware } from "@clerk/express";
import compression from "compression";
import express, { type Application } from "express";
import fs from "fs";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { FILE_UPLOAD_DESTINATION } from "./core/constant";
import { createRouterWithSwagger } from "./helpers/createRouterWithSwagger";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { requestLoggerWithTimeout } from "./middleware/logger";
import { customCors, securityHeaders } from "./middleware/security";
import { publicRoutes } from "./routes/public.route";
import adminRoutes from "./routes/admin.route";
import protectedRoutes from "./routes/protected.route";

if (!fs.existsSync(FILE_UPLOAD_DESTINATION)) {
  logger.warn("FILE UPLOADS FOLDER NOT FOUND");
  logger.info("CREATING FILE UPLOAD FOLDER");
  fs.mkdirSync(FILE_UPLOAD_DESTINATION, { recursive: true });
}

export function createApp(): Application {
  const app = express();
  app.use(
    clerkMiddleware({
      secretKey: env.CLERK_SECRET_KEY,
      publishableKey: env.CLERK_PUBLISHABLE_KEY,
    })
  );
  app.use(securityHeaders);
  app.use(customCors);
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(requestLoggerWithTimeout);

  app.use(
    "/public/uploads",
    express.static(FILE_UPLOAD_DESTINATION, {
      setHeaders: (res) => {
        res.header("Access-Control-Allow-Origin", env.CORS_HOSTS);
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Credentials", "true");
      },
    })
  );

  app.all("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  createRouterWithSwagger({
    app,
    routes: [...publicRoutes, ...adminRoutes, ...protectedRoutes],
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
