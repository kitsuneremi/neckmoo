/*
  Warnings:

  - You are about to drop the `subcomments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `subcomments` DROP FOREIGN KEY `subComments_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `subcomments` DROP FOREIGN KEY `subComments_commentId_fkey`;

-- AlterTable
ALTER TABLE `comments` ADD COLUMN `referenceId` INTEGER NULL;

-- DropTable
DROP TABLE `subcomments`;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_referenceId_fkey` FOREIGN KEY (`referenceId`) REFERENCES `Comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
