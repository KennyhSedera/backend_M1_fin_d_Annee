import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VolumeHoraireService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.VolumeHoraireCreateInput) {
    await this.prisma.volumeHoraire.create({ data });
    return {
      success: true,
      message: 'Volume Horaire ajouté avec succès.',
    };
  }

  async findAll() {
    const result = await this.prisma.volumeHoraire.findMany({
      include: {
        uniteEnseignement: {
          include: {
            niveau: true,
            parcours: true,
          },
        },
      },
    });

    const vh = [];
    result.forEach((el) => {
      vh.push({
        id: el.id,
        elementConstitutif: el.elementConstitutif,
        semestre: el.semestre,
        et: el.et,
        ed: el.ed,
        ep: el.ep,
        creditEC: el.creditEC,
        poidsEC: el.poidsEC,
        creditUE: el.uniteEnseignement?.creditUE,
        uniteEnseignement: el.uniteEnseignement?.nom,
        parcours: el.uniteEnseignement?.parcours?.nom,
        niveau: el.uniteEnseignement?.niveau?.nom,
      });
    });

    return vh;
  }

  async findAllByParcoursEns(parcours: string) {
    const parcoursNiveaux = await this.prisma.parcoursNiveau.findMany({
      where: {
        parcours: {
          nom: parcours,
        },
      },
      include: {
        niveau: true,
        parcours: {
          include: {
            mention: true,
          },
        },
      },
    });

    const volumeHoraire = await this.prisma.volumeHoraire.findMany({
      include: {
        uniteEnseignement: true,
        enseignantVolumeHoraire: {
          include: { enseignant: true },
        },
      },
    });

    const result = parcoursNiveaux.map((parcoursNiveau) => {
      const volumeHoraireFilter = volumeHoraire.filter(
        (vh) =>
          vh.uniteEnseignement.niveauId === parcoursNiveau.niveauId &&
          vh.uniteEnseignement.parcoursId === parcoursNiveau.parcoursId,
      );
      const volumesHoraires = volumeHoraireFilter.map((volume) => ({
        id: volume.id,
        codeEns: volume.enseignantVolumeHoraire[0]?.enseignant.codeEns,
        nomEns: volume.enseignantVolumeHoraire[0]?.enseignant.nom,
        elementConstitutif: volume.elementConstitutif,
        semestre: volume.semestre,
        et: volume.et || 0,
        ed: volume.ed || 0,
        ep: volume.ep || 0,
        creditUE: volume.uniteEnseignement.creditUE || 0,
        creditEC: volume.creditEC || 0,
        poidsEC: volume.poidsEC || 0,
      }));

      return {
        ParcoursNiveau: {
          id: parcoursNiveau.id,
          anneeUniversitaire: parcoursNiveau.anneeUniversitaire,
          mention: parcoursNiveau.parcours.mention.nom,
          parcours: parcoursNiveau.parcours.nom,
          niveau: parcoursNiveau.niveau.nom,
          volumesHoraires: volumesHoraires,
        },
      };
    });

    return result;
  }

  async findAllParcours(parcoursNom: string) {
    const parcoursNiveaux = await this.prisma.parcoursNiveau.findMany({
      where: {
        parcours: {
          nom: parcoursNom,
        },
      },
      include: {
        niveau: true,
        parcours: {
          include: {
            mention: true,
          },
        },
      },
    });

    const volumeHoraire = await this.prisma.volumeHoraire.findMany({
      include: {
        uniteEnseignement: true,
        enseignantVolumeHoraire: {
          include: { enseignant: true },
        },
      },
    });

    const result = parcoursNiveaux.map((parcoursNiveau) => {
      const volumeHoraireFilter = volumeHoraire.filter(
        (vh) =>
          vh.uniteEnseignement.niveauId === parcoursNiveau.niveauId &&
          vh.uniteEnseignement.parcoursId === parcoursNiveau.parcoursId,
      );

      const volumesHoraires = volumeHoraireFilter.map((volume) => ({
        id: volume.id,
        elementConstitutif: volume.elementConstitutif,
        semestre: volume.semestre,
        et: volume.et || 0,
        ed: volume.ed || 0,
        ep: volume.ep || 0,
        creditUE: volume.uniteEnseignement.creditUE || 0,
        creditEC: volume.creditEC || 0,
        poidsEC: volume.poidsEC || 0,
      }));

      const uniqueUniteEnseignement = volumeHoraireFilter.reduce(
        (acc, volume) => {
          const existingUE = acc.find(
            (ue) => ue.id == volume.uniteEnseignement.id,
          );
          if (!existingUE) {
            acc.push({
              id: volume.uniteEnseignement.id,
              name: volume.uniteEnseignement.nom,
              volumesHoraires: volumesHoraires,
            });
          }
          return acc;
        },
        [],
      );

      return {
        ParcoursNiveau: {
          id: parcoursNiveau.id,
          anneeUniversitaire: parcoursNiveau.anneeUniversitaire,
          mention: parcoursNiveau.parcours.mention.nom,
          parcours: parcoursNiveau.parcours.nom,
          niveau: parcoursNiveau.niveau.nom,
          UE_EC: uniqueUniteEnseignement,
        },
      };
    });

    return result;
  }

  async update(id: number, data: Prisma.VolumeHoraireUncheckedUpdateInput) {
    await this.prisma.volumeHoraire.update({ where: { id }, data });
    return {
      success: true,
      message: 'Volume Horaire modifié avec succès.',
    };
  }

  async delete(id: number) {
    await this.prisma.volumeHoraire.delete({ where: { id } });
    return {
      success: true,
      message: 'Volume Horaire supprimé avec succès.',
    };
  }
}
