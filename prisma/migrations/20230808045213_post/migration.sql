/*
  Warnings:

  - You are about to drop the column `timeLimit` on the `post` table. All the data in the column will be lost.
  - Added the required column `hasTimeLimit` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `timeLimit`,
    ADD COLUMN `hasTimeLimit` BOOLEAN NOT NULL,
    ADD COLUMN `timeLimitValue` VARCHAR(191) NULL;
