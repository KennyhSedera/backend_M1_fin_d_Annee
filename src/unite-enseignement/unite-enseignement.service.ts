import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { log } from 'console';

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
    return this.prisma.uniteEnseignement.findMany();
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

    let UE = [];
    for (let i = 0; i < result.length; i++) {
      UE.push({
        id: result[i].id,
        mention: result[i].parcours.mention.nom,
        parcours: result[i].parcours.nom,
        niveau: result[i].niveau.nom,
        name: result[i].name,
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
