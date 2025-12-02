import prisma from "@/config/database";
import { DEFAULT_ORDER_BY } from "@/core/constant";
import type {
  CreateGameTag,
  FindAllGameTag,
  UpdateGameTag,
} from "./gameTag.schema";

const gameTagRepo = {
  create: (userId: number, payload: CreateGameTag["body"]) => {
    return prisma.userGameTag.create({
      data: {
        ...payload,
        userId,
      },
    });
  },
  findById: (id: number) => {
    return prisma.userGameTag.findFirst({
      where: {
        id,
      },
    });
  },
  update: (id: number, payload: UpdateGameTag["body"]) => {
    return prisma.userGameTag.update({
      data: payload,
      where: {
        id,
      },
    });
  },
  destroy: (id: number) => {
    return prisma.userGameTag.delete({
      where: {
        id,
      },
    });
  },
  findAll: (userId: number, query: FindAllGameTag["query"]) => {
    const { page, limit, gameId, status } = query;
    const skip = (page - 1) * limit;
    return prisma.$transaction([
      prisma.userGameTag.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: DEFAULT_ORDER_BY,
        },
        where: {
          userId,
          gameId: gameId ?? undefined,
          status: status ?? undefined,
        },
        include: {
          Game: true,
        },
      }),
      prisma.userGameTag.count({
        orderBy: {
          createdAt: DEFAULT_ORDER_BY,
        },
        where: {
          userId,
          gameId: gameId ?? undefined,
          status: status ?? undefined,
        },
      }),
    ]);
  },
  findGameTagByUserIdAndGameId: (userId: number, gameId: number) => {
    return prisma.userGameTag.findFirst({
      where: {
        userId,
        gameId,
      },
    });
  },

  requestGameTag: (userId: number, gameId: number) => {
    return prisma.userGameTag.create({
      data: {
        status: "REQUESTED",
        userId: userId,
        gameId: gameId,
      },
    });
  },
};

export default gameTagRepo;
