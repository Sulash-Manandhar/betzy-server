import prisma from "@/config/database";
import type {
  CreateGamePayload,
  FindAllGamePayload,
  UpdateGamePayload,
} from "./games.schema";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/core/constant";

const gamesRepo = {
  create: (payload: CreateGamePayload) => {
    return prisma.game.create({
      data: payload,
    });
  },
  update: (id: number, payload: UpdateGamePayload) => {
    return prisma.game.update({
      where: {
        id,
      },
      data: payload,
    });
  },
  findOne: (id: number) => {
    return prisma.game.findFirst({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });
  },
  destroy: (id: number) => {
    return prisma.game.delete({
      where: {
        id,
      },
    });
  },
  findAll: (query: FindAllGamePayload) => {
    const { page, limit, name, description } = query;

    const skip = (page - 1) * limit;
    return prisma.$transaction([
      prisma.game.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "asc",
        },
        include: {
          image: true,
        },
        where: {
          name: {
            contains: name,
          },
          description: {
            contains: description,
          },
          is_featured: {
            equals: true,
          },
        },
      }),
      prisma.game.count({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          name: {
            contains: name,
          },
          description: {
            contains: description,
          },
        },
      }),
    ]);
  },
};

export default gamesRepo;
