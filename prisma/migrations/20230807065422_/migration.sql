/*
  Warnings:

  - You are about to drop the column `timeLimitPost` on the `task` table. All the data in the column will be lost.
  - You are about to alter the column `siteLinkHidden` on the `task` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - Made the column `description` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `timeLimitPost`,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `siteLinkHidden` VARCHAR(191) NULL;
