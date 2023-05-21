/*
  Warnings:

  - Made the column `name` on table `accounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `accounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `accounts` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `username` VARCHAR(191) NOT NULL;
