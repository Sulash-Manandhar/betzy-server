import prisma from "@/config/database";
import type { UserJSON } from "@clerk/express";

type CustomJSON = {
  referralCode: string;
  membershipId: number;
};

export const webhookRepo = {
  create: (payload: UserJSON & CustomJSON) => {
    return prisma.user.create({
      data: {
        clerkId: payload.id,
        firstName: payload.first_name,
        lastName: payload.last_name,
        xp: 0,
        balance: 0,
        email: payload.email_addresses?.[0]?.email_address || "",
        referralCode: payload.referralCode,
        membershipId: payload.membershipId,
        profileUrl: payload.image_url,
      },
    });
  },
  update: (payload: UserJSON) => {
    return prisma.user.update({
      data: {
        clerkId: payload.id,
        firstName: payload.first_name,
        lastName: payload.last_name,
        email: payload.email_addresses?.[0]?.email_address || "",
        profileUrl: payload.image_url,
      },
      where: {
        clerkId: payload.id,
      },
    });
  },
  destroy: (clerkId: string) => {
    return prisma.user.delete({
      where: {
        clerkId: clerkId,
      },
    });
  },
};
