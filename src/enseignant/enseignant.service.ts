import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { NewCodeEns } from './incrementCodeEns';

@Injectable()
export class EnseignantService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.EnseignantUncheckedCreateInput) {
    const ens = await this.prisma.enseignant.findMany({
      where: { CIN: data.CIN },
    });
    if (ens.length > 0) {
      return {
        success: false,
        message: 'Enseignant existe déjà.',
      };
    }
    const res = await this.prisma.enseignant.findMany({
      where: { type: data.type },
    });
    if (res.length > 0) {
      data.codeEns = NewCodeEns(res[res.length - 1].codeEns);
    } else {
      data.codeEns = data.type[0] + '01';
    }
    await this.prisma.enseignant.create({ data });
    return {
      success: true,
      message: 'Enseignant ajouté avec succès.',
    };
  }

  async findAll() {
    return await this.prisma.enseignant.findMany({
      include: {
        grade: true,
      },
      orderBy: { codeEns: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.enseignant.findUnique({ where: { id } });
  }

  async findAllDecomptTheo() {
    const result = await this.prisma.enseignant.findMany({
      include: {
        enseignantVolumeHoraire: {
          select: {
            volumeHoraire: {
              include: {
                parcoursNiveau: {
                  include: { parcours: true },
                },
              },
            },
          },
        },
      },
      orderBy: { codeEns: 'asc' },
    });

    const parcours = await this.prisma.parcours.findMany();

    // Transformer les données pour obtenir le décompte par parcours avec les sommes calculées
    const enseignant = result.map((ens) => {
      // Initialiser les totaux globaux pour l'enseignant
      let totalGlobalET = 0;
      let totalGlobalED = 0;
      let totalGlobalEP = 0;

      const decompte = parcours.map((p) => {
        // Filtrer les volumes horaires de l'enseignant pour chaque parcours
        const volumes = ens.enseignantVolumeHoraire.filter(
          (esh) => esh.volumeHoraire.parcoursNiveau.parcoursId === p.id,
        );

        // Calculer les sommes des produits des volumes horaires avec les groupes pour ce parcours
        const totalET = volumes.reduce(
          (sum, esh) =>
            sum +
            (esh.volumeHoraire.et || 0) *
              (esh.volumeHoraire.parcoursNiveau?.nombreGroupesET || 1),
          0,
        );

        const totalED = volumes.reduce(
          (sum, esh) =>
            sum +
            (esh.volumeHoraire.ed || 0) *
              (esh.volumeHoraire.parcoursNiveau?.nombreGroupesED || 1),
          0,
        );

        const totalEP = volumes.reduce(
          (sum, esh) =>
            sum +
            (esh.volumeHoraire.ep || 0) *
              (esh.volumeHoraire.parcoursNiveau?.nombreGroupesEP || 1),
          0,
        );

        totalGlobalET += totalET;
        totalGlobalED += totalED;
        totalGlobalEP += totalEP;

        return {
          parcours: p.nom,
          totalET,
          totalED,
          totalEP,
        };
      });

      return {
        codeEns: ens.codeEns,
        nomEns: `${ens.nom} ${ens.prenom}`,
        decompte,
        totalGlobalET,
        totalGlobalED,
        totalGlobalEP,
      };
    });

    return enseignant;
  }

  async findAllDecomptPra() {
    const result = await this.prisma.enseignant.findMany({
      include: {
        heuresComplementaires: {
          include: {
            parcoursNiveau: {
              include: {
                parcours: {
                  select: { id: true, nom: true },
                },
              },
            },
          },
        },
      },
      orderBy: { codeEns: 'asc' },
    });

    const parcoursPredifinis = await this.prisma.parcours.findMany();

    const enseignantDecompte = result.map((enseignant) => {
      const parcoursMap: Record<
        string,
        { parcours: string; encadrementTotal: number; soutenanceTotal: number }
      > = {};

      enseignant.heuresComplementaires.forEach((hc) => {
        const parcoursNom = hc.parcoursNiveau.parcours.nom;

        // Calculer les totaux d'encadrement et de soutenance
        const encadrementTotal =
          (hc.nbEncadrement || 0) * (hc.tauxEncadrement || 0);
        const soutenanceTotal =
          (hc.nbSoutenance || 0) * (hc.tauxSoutenance || 0);

        if (!parcoursMap[parcoursNom]) {
          parcoursMap[parcoursNom] = {
            parcours: parcoursNom,
            encadrementTotal: 0,
            soutenanceTotal: 0,
          };
        }

        parcoursMap[parcoursNom].encadrementTotal += encadrementTotal;
        parcoursMap[parcoursNom].soutenanceTotal += soutenanceTotal;
      });

      parcoursPredifinis.forEach((parcoursNom) => {
        if (!parcoursMap[parcoursNom.nom]) {
          parcoursMap[parcoursNom.nom] = {
            parcours: parcoursNom.nom,
            encadrementTotal: 0,
            soutenanceTotal: 0,
          };
        }
      });

      const decompteParcours = Object.values(parcoursMap);

      const totalEncadrement = decompteParcours.reduce(
        (acc, parcours) => acc + (parcours.encadrementTotal || 0),
        0,
      );
      const totalSoutenance = decompteParcours.reduce(
        (acc, parcours) => acc + (parcours.soutenanceTotal || 0),
        0,
      );

      return {
        codeEns: enseignant.codeEns,
        nomEns: `${enseignant.nom} ${enseignant.prenom}`,
        decompteParcours,
        totalEncadrement,
        totalSoutenance,
      };
    });

    return enseignantDecompte;
  }

  async update(id: number, data: Prisma.EnseignantUpdateInput) {
    await this.prisma.enseignant.update({ where: { id }, data });
    return {
      success: true,
      message: 'Enseignant modifié avec succès.',
    };
  }

  async delete(id: number) {
    await this.prisma.enseignant.delete({ where: { id } });
    return {
      success: true,
      message: 'Enseignant supprimé avec succès.',
    };
  }
}
