import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UniteEnseignementService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UniteEnseignementCreateInput) {
    await this.prisma.uniteEnseignement.create({ data });
    return {
      success: true,
      message: "Unité d'enseignement ajouté avec succès.",
    };
  }

  async findAll() {
    const data = await this.prisma.uniteEnseignement.findMany({
      include: { parcours: true, niveau: true },
    });

    const ue = [];
    data.forEach((el) => {
      ue.push({
        id: el.id,
        nom: el.nom,
        creditUE: el.creditUE,
        niveau: el.niveau?.nom,
        parcours: el.parcours?.nom,
      });
    });

    return ue;
  }

  async findAllByParcours(parcours: string) {
    const result = await this.prisma.uniteEnseignement.findMany({
      where: {
        parcours: {
          nom: parcours,
        },
      },
      include: {
        niveau: true,
        parcours: {
          include: { mention: true },
        },
      },
    });

    const UE = [];
    for (let i = 0; i < result.length; i++) {
      UE.push({
        id: result[i].id,
        mention: result[i].parcours.mention.nom,
        parcours: result[i].parcours.nom,
        niveau: result[i].niveau.nom,
        name: result[i].nom,
      });
    }
    return UE;
  }

  async update(id: number, data: Prisma.UniteEnseignementUpdateInput) {
    await this.prisma.uniteEnseignement.update({ where: { id }, data });
    return {
      success: true,
      message: "Unité d'enseignement modifié avec succès.",
    };
  }

  async delete(id: number) {
    await this.prisma.uniteEnseignement.delete({ where: { id } });
    return {
      success: true,
      message: "Unité d'enseignement supprimé avec succès.",
    };
  }
}
