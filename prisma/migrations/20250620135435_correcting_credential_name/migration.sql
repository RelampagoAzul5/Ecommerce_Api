/*
  Warnings:

  - You are about to drop the column `crendential` on the `Stores` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[credential]` on the table `Stores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `credential` to the `Stores` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Stores_crendential_key` ON `Stores`;

-- AlterTable
ALTER TABLE `Stores` DROP COLUMN `crendential`,
    ADD COLUMN `credential` VARCHAR(18) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Stores_credential_key` ON `Stores`(`credential`);
