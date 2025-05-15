/*
  Warnings:

  - You are about to drop the column `avatar` on the `Stores` table. All the data in the column will be lost.
  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[avatarId]` on the table `Stores` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Images` DROP FOREIGN KEY `Images_productAvaliationId_fkey`;

-- DropForeignKey
ALTER TABLE `Images` DROP FOREIGN KEY `Images_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Images` DROP FOREIGN KEY `Images_storeAvaliationId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_avatarId_fkey`;

-- DropForeignKey
ALTER TABLE `chatMessages` DROP FOREIGN KEY `chatMessages_imageId_fkey`;

-- AlterTable
ALTER TABLE `Stores` DROP COLUMN `avatar`,
    ADD COLUMN `avatarId` INTEGER NULL;

-- DropTable
DROP TABLE `Images`;

-- CreateTable
CREATE TABLE `AvatarUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AvatarStore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StoreAvaliationImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(500) NOT NULL,
    `storeAvaliationId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(500) NOT NULL,
    `productId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductAvaliationImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(500) NOT NULL,
    `productAvaliationId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MessageImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Stores_avatarId_key` ON `Stores`(`avatarId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_avatarId_fkey` FOREIGN KEY (`avatarId`) REFERENCES `AvatarUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stores` ADD CONSTRAINT `Stores_avatarId_fkey` FOREIGN KEY (`avatarId`) REFERENCES `AvatarStore`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreAvaliationImages` ADD CONSTRAINT `StoreAvaliationImages_storeAvaliationId_fkey` FOREIGN KEY (`storeAvaliationId`) REFERENCES `StoreAvaliations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImages` ADD CONSTRAINT `ProductImages_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductAvaliationImages` ADD CONSTRAINT `ProductAvaliationImages_productAvaliationId_fkey` FOREIGN KEY (`productAvaliationId`) REFERENCES `ProductAvaliations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chatMessages` ADD CONSTRAINT `chatMessages_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `MessageImages`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
