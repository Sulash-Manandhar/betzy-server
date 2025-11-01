import { logger } from "@/config/logger";
import { FILE_UPLOAD_DESTINATION } from "@/core/constant";
import multer, { type FileFilterCallback } from "multer";
import path from "path";
import type { Request } from "express";

const filetypes = /jpeg|jpg|png/;

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, FILE_UPLOAD_DESTINATION);
  },
  filename: function (req, file, callback) {
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    callback(null, `${timestamp}_${sanitizedName}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    callback(null, true);
  } else {
    const msg = "Invalid file type. Only JPEG, JPG, and PNG are allowed.";
    logger.error(msg);
    callback(new Error(msg));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

/**
 * Middleware for single file upload
 * Usage: app.post("/upload", uploadSingle("image"), handler)
 */
export const uploadSingle = (fieldName: string) => upload.single(fieldName);

/**
 * Middleware for multiple file upload
 * Usage: app.post("/upload", uploadMultiple("images", 5), handler)
 */
export const uploadMultiple = (fieldName: string, maxCount = 10) =>
  upload.array(fieldName, maxCount);
