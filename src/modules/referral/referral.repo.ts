import prisma from "@/config/database";

export const referralRepo = {
  findByUser: (code: string) => {
    return prisma.user.findFirst({
      where: {
        referralCode: code,
      },
    });
  },

  create: (referrerId: number, referredUserId: number, code: string) => {
    return prisma.referral.create({
      data: {
        referralCode: code,
        referrerId: referrerId,
        referredUserId: referredUserId,
      },
    });
  },
};
