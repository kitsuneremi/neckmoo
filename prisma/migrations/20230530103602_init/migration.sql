-- CreateTable
CREATE TABLE `Subcribes` (
    `accountId` INTEGER NOT NULL,
    `channelId` INTEGER NOT NULL,

    PRIMARY KEY (`accountId`, `channelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subcribes` ADD CONSTRAINT `Subcribes_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subcribes` ADD CONSTRAINT `Subcribes_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `Channels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
