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
    return this.prisma.uniteEnseignement.findMany({
      include: {
        niveau: true,
        parcours: {
          include: { mention: true },
        },
        volumeHoraire: true,
      },
    });
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
