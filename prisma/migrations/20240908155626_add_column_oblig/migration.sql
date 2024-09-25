/*
  Warnings:

  - Made the column `gradeId` on table `enseignant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `enseignant` DROP FOREIGN KEY `Enseignant_gradeId_fkey`;

-- AlterTable
ALTER TABLE `enseignant` ADD COLUMN `Oblig` INTEGER NULL DEFAULT 0,
    MODIFY `gradeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Enseignant` ADD CONSTRAINT `Enseignant_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `Grade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
