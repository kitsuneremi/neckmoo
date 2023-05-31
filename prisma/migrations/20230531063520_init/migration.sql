/*
  Warnings:

  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `likes` table. All the data in the column will be lost.
  - Added the required column `type` to the `Likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Likes_id_key` ON `likes`;

-- AlterTable
ALTER TABLE `likes` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `type` INTEGER NOT NULL,
    ADD PRIMARY KEY (`videoId`, `accountId`);
