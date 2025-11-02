import { HTTPStatusCode } from "@/utils/packages";
import Boom from "@hapi/boom";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import type { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger";

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
        return res.status(HTTPStatusCode.CONFLICT).json({
          success: false,
          error: {
            message: "A record with this value already exists",
            statusCode: HTTPStatusCode.CONFLICT,
            details: { field: err.meta?.target },
          },
        });
      case "P2025":
        return res.status(HTTPStatusCode.NOT_FOUND).json({
          success: false,
          error: {
            message: "Record not found",
            statusCode: HTTPStatusCode.NOT_FOUND,
          },
        });
      case "P2003":
        return res.status(HTTPStatusCode.BAD_REQUEST).json({
          success: false,
          error: {
            message: "Invalid foreign key constraint",
            statusCode: HTTPStatusCode.BAD_REQUEST,
          },
        });
      default:
        return res.status(HTTPStatusCode.BAD_REQUEST).json({
          success: false,
          error: {
            message: "Database operation failed",
            statusCode: HTTPStatusCode.BAD_REQUEST,
          },
        });
    }
  }

  if (err instanceof PrismaClientValidationError) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      success: false,
      error: {
        message: "Invalid data provided",
        statusCode: HTTPStatusCode.BAD_REQUEST,
      },
    });
  }

  // Default error
  const statusCode = HTTPStatusCode.INTERNAL_SERVER_ERROR;
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
  res.status(HTTPStatusCode.NOT_FOUND).json({
    success: false,
    error: {
      message: `Route ${req.originalUrl} not found`,
      statusCode: HTTPStatusCode.NOT_FOUND,
    },
  });
};
