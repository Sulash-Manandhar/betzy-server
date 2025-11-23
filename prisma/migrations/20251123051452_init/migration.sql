/*
  Warnings:

  - You are about to drop the `CustomerGameTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CustomerGameTag" DROP CONSTRAINT "CustomerGameTag_gameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CustomerGameTag" DROP CONSTRAINT "CustomerGameTag_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_image_id_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "is_featured" SET DEFAULT true;

-- DropTable
DROP TABLE "public"."CustomerGameTag";

-- DropTable
DROP TABLE "public"."Image";

-- CreateTable
CREATE TABLE "UserGameTag" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "gameTag" TEXT NOT NULL,
    "password" TEXT,
    "status" "GameTagStatus" NOT NULL DEFAULT 'NOT_APPLIED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGameTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGameTag_gameTag_key" ON "UserGameTag"("gameTag");

-- CreateIndex
CREATE INDEX "UserGameTag_userId_gameId_idx" ON "UserGameTag"("userId", "gameId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGameTag_gameId_gameTag_key" ON "UserGameTag"("gameId", "gameTag");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Gallery"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGameTag" ADD CONSTRAINT "UserGameTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGameTag" ADD CONSTRAINT "UserGameTag_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
