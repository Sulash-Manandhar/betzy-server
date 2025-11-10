import { paginationMeta } from "@/utils/paginationMeta";
import fs from "fs";
import galleryRepo from "./gallery.repo";
import type { FindAllImagePayload } from "./gallery.schema";

const galleryService = {
  create: async (payload: Express.Multer.File) => {
    try {
      const image = await galleryRepo.create({
        fileName: payload.filename,
        url: payload.path,
      });
      return {
        message: "Successfully created image",
        success: true,
        data: image,
      };
    } catch (error) {
      throw error;
    }
  },
  createMany: async (payloads: Express.Multer.File[]) => {
    try {
      const images = await galleryRepo.createMany(
        payloads.map((payload) => ({
          fileName: payload.filename,
          url: payload.path,
        }))
      );
      return {
        message: `Successfully created ${images.count} image(s)`,
        success: true,
        data: { count: images.count },
      };
    } catch (error) {
      throw error;
    }
  },
  findById: async (id: number) => {
    try {
      const image = await galleryRepo.findById(id);
      return image;
    } catch (error) {
      throw error;
    }
  },
  remove: async (id: number) => {
    try {
      const image = await galleryRepo.remove(id);
      if (fs.existsSync(image.url)) {
        fs.unlinkSync(image.url);
      }
      return {
        message: "OK",
      };
    } catch (error) {
      throw error;
    }
  },
  findAll: async (query: FindAllImagePayload["query"]) => {
    try {
      const [images, count] = await galleryRepo.findAll(query);
      return {
        list: images,
        meta: paginationMeta({
          currentPage: query.page,
          limit: query.limit,
          totalCount: count,
        }),
      };
    } catch (error) {
      throw error;
    }
  },
};

export default galleryService;
