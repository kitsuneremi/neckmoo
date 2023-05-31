/*
  Warnings:

  - The primary key for the `notifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `notifications` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Notifications_id_key` ON `notifications`;

-- AlterTable
ALTER TABLE `notifications` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`accountId`, `channelId`);
