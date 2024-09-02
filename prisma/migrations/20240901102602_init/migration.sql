-- AlterTable
ALTER TABLE `user` ALTER COLUMN `status` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Enseignant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codeProf` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `grade` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Enseignant_codeProf_key`(`codeProf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
