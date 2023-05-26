/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `Channels` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Channels_accountId_key` ON `Channels`(`accountId`);

-- AddForeignKey
ALTER TABLE `Channels` ADD CONSTRAINT `Channels_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
