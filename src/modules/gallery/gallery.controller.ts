import { DEFAULT_MAX_FILE_COUNT } from "@/core/constant";
import { asyncHandler, asyncValidationHandler } from "@/helpers/asyncHandler";
import uploaderMiddleware from "@/middleware/uploader";
import { Boom, HTTPStatusCode } from "@/utils/packages";
import { type Request, type Response } from "express";
import { findAllImageSchema, type FindAllImagePayload } from "./gallery.schema";
import galleryService from "./gallery.service";

const galleryController = {
  createImage: uploaderMiddleware.single(
    "image",
    asyncHandler(async (req: Request, res: Response) => {
      if (!req.file) {
        throw Boom.badRequest("Image file is required");
      }
      const result = await galleryService.create(req.file);

      res.status(HTTPStatusCode.CREATED).json(result);
    })
  ),
  createImages: uploaderMiddleware.multiple(
    "images",
    DEFAULT_MAX_FILE_COUNT,
    asyncHandler(async (req: Request, res: Response) => {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        throw Boom.badRequest("At least one image file is required");
      }
      const imagePayloads = req.files.map((file) => {
        return file;
      });

      const result = await galleryService.createMany(imagePayloads);

      res.status(HTTPStatusCode.CREATED).json(result);
    })
  ),
  destroy: asyncHandler(async (req: Request<{ id: number }>, res: Response) => {
    await galleryService.remove(Number(req.params.id));
    res.status(HTTPStatusCode.OK).json({
      message: HTTPStatusCode.getStatusText(HTTPStatusCode.OK),
    });
  }),
  findAll: asyncValidationHandler<FindAllImagePayload>(findAllImageSchema)(
    async (req, res, validated) => {
      const response = await galleryService.findAll(validated.query);
      return res.status(HTTPStatusCode.OK).json(response);
    }
  ),
};
export default galleryController;
