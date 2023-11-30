-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `siteLink` VARCHAR(191) NOT NULL,
    `timeLimit` BOOLEAN NOT NULL,
    `description` VARCHAR(191) NULL,
    `remarks` VARCHAR(191) NULL,
    `needProof` BOOLEAN NOT NULL,
    `siteLinkHidden` BOOLEAN NOT NULL,
    `timeLimitPost` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
