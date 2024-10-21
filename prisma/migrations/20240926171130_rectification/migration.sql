/*
  Warnings:

  - You are about to drop the column `parcoursNiveauId` on the `volume_horaire` table. All the data in the column will be lost.
  - You are about to drop the `_niveau_volume_horaire_fkey` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_parcours_volume_horaire_fkey` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_niveau_volume_horaire_fkey` DROP FOREIGN KEY `_niveau_volume_horaire_fkey_A_fkey`;

-- DropForeignKey
ALTER TABLE `_niveau_volume_horaire_fkey` DROP FOREIGN KEY `_niveau_volume_horaire_fkey_B_fkey`;

-- DropForeignKey
ALTER TABLE `_parcours_volume_horaire_fkey` DROP FOREIGN KEY `_parcours_volume_horaire_fkey_A_fkey`;

-- DropForeignKey
ALTER TABLE `_parcours_volume_horaire_fkey` DROP FOREIGN KEY `_parcours_volume_horaire_fkey_B_fkey`;

-- DropForeignKey
ALTER TABLE `heurescomplementaire` DROP FOREIGN KEY `heuresComplementaire_niveau_fkey`;

-- DropForeignKey
ALTER TABLE `volume_horaire` DROP FOREIGN KEY `volume_horaire_parcoursNiveauId_fkey`;

-- AlterTable
ALTER TABLE `heurescomplementaire` ADD COLUMN `niveauId` INTEGER NULL,
    ADD COLUMN `parcoursId` INTEGER NULL;

-- AlterTable
ALTER TABLE `volume_horaire` DROP COLUMN `parcoursNiveauId`;

-- DropTable
DROP TABLE `_niveau_volume_horaire_fkey`;

-- DropTable
DROP TABLE `_parcours_volume_horaire_fkey`;

-- AddForeignKey
ALTER TABLE `HeuresComplementaire` ADD CONSTRAINT `HeuresComplementaire_parcoursId_fkey` FOREIGN KEY (`parcoursId`) REFERENCES `Parcours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeuresComplementaire` ADD CONSTRAINT `HeuresComplementaire_niveauId_fkey` FOREIGN KEY (`niveauId`) REFERENCES `Niveau`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
