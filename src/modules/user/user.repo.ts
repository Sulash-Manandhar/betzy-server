import prisma from "@/config/database";
import type { FindAllUser } from "./user.schema";

const userRepo = {
  findOneById: (id: number) => {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },
  findAll: (query: FindAllUser["query"]) => {
    const { email, page, limit, membership } = query;
    const skip = (page - 1) * limit;
    return prisma.$transaction([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "asc",
        },
        where: {
          email: {
            contains: email ?? undefined,
          },
          membership: {
            name: {
              contains: membership ?? undefined,
            },
          },
        },
        include: {
          membership: true,
        },
      }),
      prisma.user.count({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          email: {
            contains: email || undefined,
          },
        },
      }),
    ]);
  },
};

export default userRepo;
