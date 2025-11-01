import type { Request, Response, NextFunction } from "express";
import Boom from "@hapi/boom";
import { logger } from "../config/logger";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error("Error occurred:", {
    error: err.message,
    url: req.url,
    method: req.method,
  });

  // Handle Boom errors
  if (Boom.isBoom(err)) {
    const { data, output } = err;
    return res.status(output.statusCode).json({
      success: false,
      error: {
        message: output.payload.message,
        statusCode: output.statusCode,
        details: data,
      },
    });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(409).json({
          success: false,
          error: {
            message: "A record with this value already exists",
            statusCode: 409,
            details: { field: err.meta?.target },
          },
        });
      case "P2025":
        return res.status(404).json({
          success: false,
          error: {
            message: "Record not found",
            statusCode: 404,
          },
        });
      case "P2003":
        return res.status(400).json({
          success: false,
          error: {
            message: "Invalid foreign key constraint",
            statusCode: 400,
          },
        });
      default:
        return res.status(400).json({
          success: false,
          error: {
            message: "Database operation failed",
            statusCode: 400,
          },
        });
    }
  }

  if (err instanceof PrismaClientValidationError) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Invalid data provided",
        statusCode: 400,
      },
    });
  }

  // Default error
  const statusCode = 500;
  res.status(statusCode).json({
    success: false,
    error: {
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message,
      statusCode,
    },
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.originalUrl} not found`,
      statusCode: 404,
    },
  });
};
