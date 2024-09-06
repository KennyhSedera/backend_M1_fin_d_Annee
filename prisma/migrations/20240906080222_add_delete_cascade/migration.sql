-- DropForeignKey
ALTER TABLE `enseignant` DROP FOREIGN KEY `Enseignant_gradeId_fkey`;

-- DropForeignKey
ALTER TABLE `enseignantvolumehoraire` DROP FOREIGN KEY `enseignantVolumeHoraire_enseignant_fkey`;

-- DropForeignKey
ALTER TABLE `enseignantvolumehoraire` DROP FOREIGN KEY `enseignantVolumeHoraire_volumeHoraire_fkey`;

-- DropForeignKey
ALTER TABLE `heurescomplementaire` DROP FOREIGN KEY `heuresComplementaire_enseignant_fkey`;

-- DropForeignKey
ALTER TABLE `heurescomplementaire` DROP FOREIGN KEY `heuresComplementaire_niveau_fkey`;

-- DropForeignKey
ALTER TABLE `uniteenseignement` DROP FOREIGN KEY `uniteEnseignement_niveau_fkey`;

-- DropForeignKey
ALTER TABLE `uniteenseignement` DROP FOREIGN KEY `uniteEnseignement_parcours_fkey`;

-- DropForeignKey
ALTER TABLE `volume_horaire` DROP FOREIGN KEY `volume_horaire_parcoursNiveauId_fkey`;

-- DropForeignKey
ALTER TABLE `volume_horaire` DROP FOREIGN KEY `volume_horaire_uniteEnseignementId_fkey`;

-- AddForeignKey
ALTER TABLE `UniteEnseignement` ADD CONSTRAINT `uniteEnseignement_niveau_fkey` FOREIGN KEY (`niveauId`) REFERENCES `Niveau`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UniteEnseignement` ADD CONSTRAINT `uniteEnseignement_parcours_fkey` FOREIGN KEY (`parcoursId`) REFERENCES `Parcours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `volume_horaire` ADD CONSTRAINT `volume_horaire_parcoursNiveauId_fkey` FOREIGN KEY (`parcoursNiveauId`) REFERENCES `ParcoursNiveau`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `volume_horaire` ADD CONSTRAINT `volume_horaire_uniteEnseignementId_fkey` FOREIGN KEY (`uniteEnseignementId`) REFERENCES `UniteEnseignement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enseignant` ADD CONSTRAINT `Enseignant_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `Grade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnseignantVolumeHoraire` ADD CONSTRAINT `enseignantVolumeHoraire_enseignant_fkey` FOREIGN KEY (`enseignantId`) REFERENCES `Enseignant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnseignantVolumeHoraire` ADD CONSTRAINT `enseignantVolumeHoraire_volumeHoraire_fkey` FOREIGN KEY (`volumeHoraireId`) REFERENCES `volume_horaire`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeuresComplementaire` ADD CONSTRAINT `heuresComplementaire_enseignant_fkey` FOREIGN KEY (`enseignantId`) REFERENCES `Enseignant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeuresComplementaire` ADD CONSTRAINT `heuresComplementaire_niveau_fkey` FOREIGN KEY (`parcoursNiveauId`) REFERENCES `ParcoursNiveau`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
