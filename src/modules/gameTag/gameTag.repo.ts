import prisma from "@/config/database";
import { DEFAULT_ORDER_BY } from "@/core/constant";
import type {
  CreateGameTag,
  FindAllGameTag,
  UpdateGameTag,
} from "./gameTag.schema";

const gameTagRepo = {
  create: (userId: number, payload: CreateGameTag["body"]) => {
    return prisma.customerGameTag.create({
      data: {
        ...payload,
        userId,
      },
    });
  },
  findById: (id: number) => {
    return prisma.customerGameTag.findFirst({
      where: {
        id,
      },
    });
  },
  update: (id: number, payload: UpdateGameTag["body"]) => {
    return prisma.customerGameTag.update({
      data: payload,
      where: {
        id,
      },
    });
  },
  destroy: (id: number) => {
    return prisma.customerGameTag.delete({
      where: {
        id,
      },
    });
  },
  findAll: (userId: number, query: FindAllGameTag["query"]) => {
    const { page, limit, gameId } = query;
    const skip = (page - 1) * limit;
    return prisma.$transaction([
      prisma.customerGameTag.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: DEFAULT_ORDER_BY,
        },
        where: {
          userId,
          gameId: gameId ?? undefined,
        },
        include: {
          Game: true,
        },
      }),
      prisma.customerGameTag.count({
        orderBy: {
          createdAt: DEFAULT_ORDER_BY,
        },
        where: {
          userId,
        },
      }),
    ]);
  },
  findGameTagByUserIdAndGameId: (userId: number, gameId: number) => {
    return prisma.customerGameTag.findFirst({
      where: {
        userId,
        gameId,
      },
    });
  },
};

export default gameTagRepo;
