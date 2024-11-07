-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `useremail` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `userPhoto` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_useremail_key`(`useremail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mention` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parcours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `mentionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Niveau` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ParcoursNiveau` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parcoursId` INTEGER NOT NULL,
    `niveauId` INTEGER NOT NULL,
    `anneeUniversitaire` VARCHAR(191) NOT NULL,
    `nombreEtudiants` INTEGER NOT NULL,
    `nombreGroupesET` INTEGER NOT NULL,
    `nombreGroupesED` INTEGER NOT NULL,
    `nombreGroupesEP` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UniteEnseignement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `creditUE` DOUBLE NOT NULL,
    `niveauId` INTEGER NULL,
    `parcoursId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `volume_horaire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `elementConstitutif` VARCHAR(191) NOT NULL,
    `semestre` VARCHAR(191) NOT NULL,
    `et` INTEGER NULL,
    `ed` INTEGER NULL,
    `ep` INTEGER NULL,
    `creditEC` DOUBLE NOT NULL,
    `poidsEC` DOUBLE NOT NULL,
    `uniteEnseignementId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `taux` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enseignant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codeEns` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `CIN` VARCHAR(191) NOT NULL,
    `gradeId` INTEGER NOT NULL,
    `Oblig` INTEGER NULL DEFAULT 0,
    `type` VARCHAR(191) NOT NULL,
    `ensPhoto` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnseignantVolumeHoraire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enseignantId` INTEGER NOT NULL,
    `volumeHoraireId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EncadrementSoutenance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enseignantId` INTEGER NOT NULL,
    `Objet` VARCHAR(191) NOT NULL,
    `nbEncadrement` INTEGER NULL,
    `nbSoutenance` INTEGER NULL,
    `tauxEncadrement` DOUBLE NULL,
    `tauxSoutenance` DOUBLE NULL,
    `parcoursId` INTEGER NULL,
    `niveauId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Parcours` ADD CONSTRAINT `parcours_mention_fkey` FOREIGN KEY (`mentionId`) REFERENCES `Mention`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParcoursNiveau` ADD CONSTRAINT `parcoursNiveau_parcours_fkey` FOREIGN KEY (`parcoursId`) REFERENCES `Parcours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParcoursNiveau` ADD CONSTRAINT `parcoursNiveau_niveau_fkey` FOREIGN KEY (`niveauId`) REFERENCES `Niveau`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UniteEnseignement` ADD CONSTRAINT `uniteEnseignement_niveau_fkey` FOREIGN KEY (`niveauId`) REFERENCES `Niveau`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UniteEnseignement` ADD CONSTRAINT `uniteEnseignement_parcours_fkey` FOREIGN KEY (`parcoursId`) REFERENCES `Parcours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `volume_horaire` ADD CONSTRAINT `volume_horaire_uniteEnseignementId_fkey` FOREIGN KEY (`uniteEnseignementId`) REFERENCES `UniteEnseignement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enseignant` ADD CONSTRAINT `Enseignant_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `Grade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnseignantVolumeHoraire` ADD CONSTRAINT `enseignantVolumeHoraire_enseignant_fkey` FOREIGN KEY (`enseignantId`) REFERENCES `Enseignant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnseignantVolumeHoraire` ADD CONSTRAINT `enseignantVolumeHoraire_volumeHoraire_fkey` FOREIGN KEY (`volumeHoraireId`) REFERENCES `volume_horaire`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncadrementSoutenance` ADD CONSTRAINT `EncadrementSoutenance_enseignantId_fkey` FOREIGN KEY (`enseignantId`) REFERENCES `Enseignant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncadrementSoutenance` ADD CONSTRAINT `EncadrementSoutenance_parcoursId_fkey` FOREIGN KEY (`parcoursId`) REFERENCES `Parcours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncadrementSoutenance` ADD CONSTRAINT `EncadrementSoutenance_niveauId_fkey` FOREIGN KEY (`niveauId`) REFERENCES `Niveau`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
