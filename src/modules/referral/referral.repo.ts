import prisma from "@/config/database";

export const referralRepo = {
  findByReferralCode: (code: string) => {
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
  findAllByReferralId: (referralId: number) => {
    return prisma.$transaction([
      prisma.referral.findMany({
        where: {
          referrerId: referralId,
        },
        include: {
          referredUser: true,
          referrer: true,
        },
      }),
      prisma.referral.count({
        where: {
          referrerId: referralId,
        },
      }),
    ]);
  },
};
