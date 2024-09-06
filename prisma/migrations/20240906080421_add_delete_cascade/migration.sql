-- DropForeignKey
ALTER TABLE `parcours` DROP FOREIGN KEY `parcours_mention_fkey`;

-- DropForeignKey
ALTER TABLE `parcoursniveau` DROP FOREIGN KEY `parcoursNiveau_niveau_fkey`;

-- DropForeignKey
ALTER TABLE `parcoursniveau` DROP FOREIGN KEY `parcoursNiveau_parcours_fkey`;

-- AddForeignKey
ALTER TABLE `Parcours` ADD CONSTRAINT `parcours_mention_fkey` FOREIGN KEY (`mentionId`) REFERENCES `Mention`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParcoursNiveau` ADD CONSTRAINT `parcoursNiveau_parcours_fkey` FOREIGN KEY (`parcoursId`) REFERENCES `Parcours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParcoursNiveau` ADD CONSTRAINT `parcoursNiveau_niveau_fkey` FOREIGN KEY (`niveauId`) REFERENCES `Niveau`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
