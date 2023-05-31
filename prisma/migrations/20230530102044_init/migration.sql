/*
  Warnings:

  - You are about to drop the `subcribes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `subcribes` DROP FOREIGN KEY `Subcribes_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `subcribes` DROP FOREIGN KEY `Subcribes_channelId_fkey`;

-- DropTable
DROP TABLE `subcribes`;
