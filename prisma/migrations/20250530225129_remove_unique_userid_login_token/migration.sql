/*
  Warnings:

  - A unique constraint covering the columns `[storeId]` on the table `AvatarStore` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `storeId` to the `AvatarStore` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `LoginToken` DROP FOREIGN KEY `LoginToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Stores` DROP FOREIGN KEY `Stores_avatarId_fkey`;

-- DropIndex
DROP INDEX `LoginToken_userId_key` ON `LoginToken`;

-- AlterTable
ALTER TABLE `AvatarStore` ADD COLUMN `storeId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AvatarStore_storeId_key` ON `AvatarStore`(`storeId`);

-- AddForeignKey
ALTER TABLE `AvatarStore` ADD CONSTRAINT `AvatarStore_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Stores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
