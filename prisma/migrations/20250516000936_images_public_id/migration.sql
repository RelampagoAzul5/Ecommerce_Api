/*
  Warnings:

  - Added the required column `publicId` to the `AvatarStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `AvatarUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `MessageImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `ProductAvaliationImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `ProductImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `StoreAvaliationImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AvatarStore` ADD COLUMN `publicId` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `AvatarUser` ADD COLUMN `publicId` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `MessageImages` ADD COLUMN `publicId` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `ProductAvaliationImages` ADD COLUMN `publicId` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `ProductImages` ADD COLUMN `publicId` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `StoreAvaliationImages` ADD COLUMN `publicId` VARCHAR(255) NOT NULL;
