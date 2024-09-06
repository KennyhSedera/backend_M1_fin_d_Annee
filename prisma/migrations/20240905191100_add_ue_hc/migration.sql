/*
  Warnings:

  - You are about to drop the column `niveauId` on the `heurescomplementaire` table. All the data in the column will be lost.
  - Added the required column `parcoursNiveauId` to the `HeuresComplementaire` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `heurescomplementaire` DROP FOREIGN KEY `heuresComplementaire_niveau_fkey`;

-- AlterTable
ALTER TABLE `heurescomplementaire` DROP COLUMN `niveauId`,
    ADD COLUMN `parcoursNiveauId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `HeuresComplementaire` ADD CONSTRAINT `heuresComplementaire_niveau_fkey` FOREIGN KEY (`parcoursNiveauId`) REFERENCES `ParcoursNiveau`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
