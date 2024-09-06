import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class HeuresComplementaireService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.HeuresComplementaireCreateInput) {
    await this.prisma.heuresComplementaire.create({ data });
    return {
      success: true,
      message: 'Heure complémentaire ajouté avec succès.',
    };
  }

  async findAll() {
    return this.prisma.heuresComplementaire.findMany();
  }

  async update(id: number, data: Prisma.HeuresComplementaireUpdateInput) {
    await this.prisma.heuresComplementaire.update({ where: { id }, data });
    return {
      success: true,
      message: 'Heure complémentaire modifié avec succès.',
    };
  }

  async delete(id: number) {
    await this.prisma.heuresComplementaire.delete({ where: { id } });
    return {
      success: true,
      message: 'Heure complémentaire supprimé avec succès.',
    };
  }
}
