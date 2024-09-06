/*
  Warnings:

  - Added the required column `uniteEnseignement` to the `HeuresComplementaire` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `heurescomplementaire` ADD COLUMN `uniteEnseignement` VARCHAR(191) NOT NULL,
    MODIFY `nbEncadrement` INTEGER NULL,
    MODIFY `tauxEncadrement` INTEGER NULL,
    MODIFY `nbSoutenance` INTEGER NULL,
    MODIFY `tauxSoutenance` INTEGER NULL;
