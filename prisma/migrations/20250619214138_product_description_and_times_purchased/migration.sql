/*
  Warnings:

  - Added the required column `description` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchasedTimes` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Products` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `purchasedTimes` INTEGER NOT NULL;
