-- CreateTable
CREATE TABLE `Channels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `tagName` VARCHAR(191) NOT NULL,
    `accountId` INTEGER NOT NULL,

    UNIQUE INDEX `Channels_tagName_key`(`tagName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Videos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `des` VARCHAR(191) NOT NULL,
    `view` INTEGER NOT NULL,
    `status` INTEGER NOT NULL,
    `link` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
