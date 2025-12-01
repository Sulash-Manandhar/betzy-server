// syncUsers.js
import prisma from "@/config/database";
import { referralService } from "@/modules/referral/referral.service";
import { clerkClient } from "@clerk/clerk-sdk-node";

async function syncUsersFromClerk() {
  try {
    console.log("🔄 Starting user sync from Clerk to Prisma...");

    let hasMore = true;
    let offset = 0;
    const limit = 100;
    let totalSynced = 0;
    let totalCreated = 0;
    let totalUpdated = 0;

    while (hasMore) {
      // Fetch users from Clerk with pagination
      const response = await clerkClient.users.getUserList({
        limit,
        offset,
      });

      const users = response.data;

      if (users.length === 0) {
        hasMore = false;
        break;
      }

      console.log(`📥 Processing ${users.length} users (offset: ${offset})...`);

      // Process each user
      for (const clerkUser of users) {
        try {
          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { clerkId: clerkUser.id },
          });

          if (existingUser) {
            console.log(`⏭️  Skipping existing user: ${clerkUser.id}`);
            totalUpdated++;
            totalSynced++;
            continue;
          }

          const referralCode = await referralService.generate();

          const userData = {
            clerkId: clerkUser.id,
            email: clerkUser.emailAddresses[0]?.emailAddress || "",
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            profileUrl: clerkUser.imageUrl,
            createdAt: new Date(clerkUser.createdAt),
            updatedAt: new Date(clerkUser.updatedAt),
          };

          await prisma.user.create({
            data: {
              clerkId: userData.clerkId,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              profileUrl: userData.profileUrl,
              balance: 0,
              membershipId: 1,
              referralCode: referralCode,
              xp: 0,
            },
          });

          totalCreated++;
          totalSynced++;
          console.log(`✅ Created new user: ${clerkUser.id}`);
        } catch (error: any) {
          console.error(
            `❌ Error syncing user ${clerkUser.id}:`,
            error.message
          );
        }
      }

      offset += limit;

      // Check if there are more users
      if (users.length < limit) {
        hasMore = false;
      }
    }

    console.log("\n✅ Sync completed successfully!");
    console.log(`📊 Total users processed: ${totalSynced}`);
    console.log(`🆕 New users created: ${totalCreated}`);
    console.log(`⏭️  Existing users skipped: ${totalUpdated}`);
  } catch (error) {
    console.error("❌ Error during sync:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the sync
syncUsersFromClerk()
  .then(() => {
    console.log("✨ Sync process finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Sync process failed:", error);
    process.exit(1);
  });
