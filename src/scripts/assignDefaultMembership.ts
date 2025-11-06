import prisma from "@/config/database";

async function main() {
  const defaultMembershipId = 1;
  await prisma.user.updateMany({
    where: { membershipId: null },
    data: {
      membershipId: defaultMembershipId,
      balance: {
        increment: 2,
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
