/*
  Warnings:

  - You are about to drop the column `cnpj` on the `Stores` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[crendential]` on the table `Stores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `credentialType` to the `Stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crendential` to the `Stores` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Stores_cnpj_key` ON `Stores`;

-- AlterTable
ALTER TABLE `Stores` DROP COLUMN `cnpj`,
    ADD COLUMN `credentialType` VARCHAR(4) NOT NULL,
    ADD COLUMN `crendential` VARCHAR(18) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Stores_crendential_key` ON `Stores`(`crendential`);

-- AddForeignKey
ALTER TABLE `LoginToken` ADD CONSTRAINT `LoginToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
