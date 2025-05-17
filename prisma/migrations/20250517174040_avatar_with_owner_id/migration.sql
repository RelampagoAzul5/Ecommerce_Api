/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `AvatarUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AvatarUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_avatarId_fkey`;

-- AlterTable
ALTER TABLE `AvatarUser` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AvatarUser_userId_key` ON `AvatarUser`(`userId`);

-- AddForeignKey
ALTER TABLE `AvatarUser` ADD CONSTRAINT `AvatarUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
