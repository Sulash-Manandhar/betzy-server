import prisma from "@/config/database";
import type { CreateUserPayloadBody } from "./auth.schema";

type NewCreateUserPayload = CreateUserPayloadBody & {
  balance?: number;
  membershipId?: number;
  referralCode: string;
};

export const authRepo = {
  create: async (payload: NewCreateUserPayload) => {
    return prisma.user.create({
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        xp: 0,
        balance: payload.balance || 2,
        email: payload.email,
        clerkId: payload.clerkId,
        timezone: payload.timezone,
        membershipId: payload.membershipId,
        referralCode: payload.referralCode,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        xp: true,
        balance: true,
        timezone: true,
        membership: true,
      },
    });
  },
  update: async (payload: Partial<NewCreateUserPayload>) => {
    return prisma.user.update({
      where: {
        clerkId: payload.clerkId,
      },
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        clerkId: payload.clerkId,
        timezone: payload.timezone,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        xp: true,
        balance: true,
        timezone: true,
        membership: true,
      },
    });
  },

  findUserByClerkId: async (clerkId: string) => {
    return prisma.user.findUnique({
      where: {
        clerkId,
      },
      include: {
        membership: true,
      },
    });
  },
};
