import prisma from "@/config/database";
import type {
  CreateNotification,
  FindAllNotification,
} from "./notification.schema";
import { DEFAULT_ORDER_BY } from "@/core/constant";

const notificationRepo = {
  create: (payload: CreateNotification["body"]) => {
    return prisma.notification.create({
      data: {
        type: payload.type,
        title: payload.title,
        description: payload.description,
        userId: payload.userId,
      },
    });
  },
  findAll: (query: FindAllNotification["query"]) => {
    const { page, limit, title, description, type } = query;
    const skip = (page - 1) * limit;
    return prisma.$transaction([
      prisma.notification.findMany({
        orderBy: {
          createdAt: DEFAULT_ORDER_BY,
        },
        where: {
          type: type,
          title: {
            contains: title,
          },
          description: {
            contains: description,
          },
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        skip,
        take: limit,
      }),
      prisma.notification.count({
        where: {
          type: type,
          title: {
            contains: title,
          },
          description: {
            contains: description,
          },
        },
        orderBy: {
          createdAt: DEFAULT_ORDER_BY,
        },
      }),
    ]);
  },
};

export default notificationRepo;
