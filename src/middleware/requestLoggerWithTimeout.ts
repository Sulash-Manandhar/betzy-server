import type { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";
import { logger } from "../config/logger";
import { getAuth } from "@clerk/express";

export const requestLoggerWithTimeout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);

  const start = Date.now();
  const timeoutMillis = 60000;

  // Set up timeout handler
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      logger.warn({
        method: req.method,
        url: req.url,
        message: "API call timeout",
        ip: req.ip,
      });
      next(boom.clientTimeout("API call timeout"));
    }
  }, timeoutMillis);

  // On response finish, log info and clear timeout
  res.on("finish", () => {
    clearTimeout(timeout);
    const duration = Date.now() - start;
    logger.info(
      JSON.stringify({
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip || JSON.stringify(req.ips) || "-",
        requestedBy: auth?.userId || "-",
      })
    );
  });

  next();
};
