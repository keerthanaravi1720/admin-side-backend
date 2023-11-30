/*
  Warnings:

  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `item`;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `siteLink` VARCHAR(191) NOT NULL,
    `timeLimit` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `remarks` VARCHAR(191) NULL,
    `needProof` BOOLEAN NOT NULL,
    `siteLinkHidden` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
