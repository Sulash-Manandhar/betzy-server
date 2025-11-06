import prisma from "@/config/database";
import type { FindAllMembership } from "./membership.schema";
import { DEFAULT_ORDER_BY } from "@/core/constant";

const membershipRepo = {
  currentMembership: (clerkId: string) => {
    return prisma.user.findFirst({
      where: {
        clerkId,
      },
      select: {
        membership: true,
        xp: true,
        balance: true,
        id: true,
      },
    });
  },
  nextMembership: (currentOrder: number) => {
    return prisma.membership.findFirst({
      where: {
        ordering: {
          equals: currentOrder + 1,
        },
      },
    });
  },
  previousMembership: (currentOrder: number) => {
    return prisma.membership.findFirst({
      where: {
        ordering: {
          equals: currentOrder - 1,
        },
      },
    });
  },
  updateUserMembership: (
    userId: number,
    membershipId: number,
    balance: number
  ) => {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        membershipId: membershipId,
        balance: {
          increment: balance,
        },
      },
    });
  },
  findAll: (query: FindAllMembership["query"]) => {
    const { page, limit, orderby, name } = query;
    const skip = (page - 1) * limit;
    return prisma.$transaction([
      prisma.membership.findMany({
        skip,
        take: limit,
        orderBy: {
          ordering: orderby || DEFAULT_ORDER_BY,
        },
        where: {
          name: {
            contains: name,
          },
        },
      }),
      prisma.membership.count({
        skip,
        take: limit,
        orderBy: {
          ordering: orderby || DEFAULT_ORDER_BY,
        },
        where: {
          name: {
            contains: name,
          },
        },
      }),
    ]);
  },
};

export default membershipRepo;
