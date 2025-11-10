import { DEFAULT_MAX_FILE_COUNT } from "@/core/constant";
import { uploadMultiple, uploadSingle } from "@/helpers/uploader";
import { Boom } from "@/utils/packages";
import type { NextFunction, Request, Response } from "express";

const uploaderMiddleware = {
  single: (
    fieldName: string,
    handler: (req: Request, res: Response, next: NextFunction) => void
  ) => {
    const uploadMiddleware = uploadSingle(fieldName);
    return (req: Request, res: Response, next: NextFunction) => {
      uploadMiddleware(req, res, (err) => {
        if (err) {
          return next(Boom.badRequest(err.message));
        }
        handler(req, res, next);
      });
    };
  },
  multiple: (
    fieldName: string,
    fileCount = DEFAULT_MAX_FILE_COUNT,
    handler: (req: Request, res: Response, next: NextFunction) => void
  ) => {
    const uploadMiddleware = uploadMultiple(fieldName, fileCount);
    return (req: Request, res: Response, next: NextFunction) => {
      uploadMiddleware(req, res, (err) => {
        if (err) {
          return next(Boom.badRequest(err.message));
        }
        handler(req, res, next);
      });
    };
  },
};

export default uploaderMiddleware;
