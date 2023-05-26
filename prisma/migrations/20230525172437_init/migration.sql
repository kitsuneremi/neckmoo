-- AlterTable
ALTER TABLE `videos` ADD COLUMN `channelId` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Videos` ADD CONSTRAINT `Videos_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `Channels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
