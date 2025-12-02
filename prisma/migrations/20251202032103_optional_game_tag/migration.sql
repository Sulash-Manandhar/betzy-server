-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "banned" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserGameTag" ALTER COLUMN "gameTag" DROP NOT NULL;
