import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ParcoursNiveauService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ParcoursNiveauCreateInput) {
    await this.prisma.parcoursNiveau.create({ data });
    return {
      success: true,
      message: 'Relation sur Parcous et Niveau ajouté avec succès.',
    };
  }

  async findAll() {
    return await this.prisma.parcoursNiveau.findMany({
      include: {
        niveau: true,
        parcours: {
          include: { mention: true },
        },
      },
    });
  }

  async findAnnee() {
    const data = await this.prisma.parcoursNiveau.groupBy({
      by: ['anneeUniversitaire'],
      orderBy: { anneeUniversitaire: 'desc' },
    });
    const result = [];
    data.forEach((el, i) =>
      result.push({
        id: i + 1,
        date: el.anneeUniversitaire,
      }),
    );
    return result;
  }

  async update(id: number, data: Prisma.ParcoursNiveauUpdateInput) {
    await this.prisma.parcoursNiveau.update({ where: { id }, data });
    return {
      success: true,
      message: 'Relation sur Parcours et Niveau modifié avec succès.',
    };
  }

  async delete(id: number) {
    await this.prisma.parcoursNiveau.delete({ where: { id } });
    return {
      success: true,
      message: 'Relation sur Niveau et Parcours supprimé avec succès.',
    };
  }
}
