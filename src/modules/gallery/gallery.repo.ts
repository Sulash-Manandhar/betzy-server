import prisma from "@/config/database";
import type { CreateImagePayload, FindAllImagePayload } from "./gallery.schema";
import { DEFAULT_ORDER_BY } from "@/core/constant";

const galleryRepo = {
  create: (payload: CreateImagePayload) => {
    return prisma.image.create({
      data: payload,
    });
  },
  createMany: (payloads: CreateImagePayload[]) => {
    return prisma.image.createMany({
      data: payloads,
    });
  },
  findById: (id: number) => {
    return prisma.image.findFirst({
      where: {
        id,
      },
    });
  },
  findAll: (query: FindAllImagePayload["query"]) => {
    const { page, limit } = query;
    const skip = (page - 1) * limit;
    return prisma.$transaction([
      prisma.image.findMany({
        orderBy: {
          createdAt: DEFAULT_ORDER_BY,
        },
        skip,
        take: limit,
      }),
      prisma.image.count({}),
    ]);
  },
  remove: (id: number) => {
    return prisma.image.delete({
      where: { id },
    });
  },
  search: (query: string) => {
    return prisma.image.findMany({
      where: {
        fileName: {
          contains: query,
        },
      },
      orderBy: {
        createdAt: DEFAULT_ORDER_BY,
      },
    });
  },
};

export default galleryRepo;
