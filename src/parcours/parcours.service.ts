import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ParcoursService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ParcoursCreateInput) {
    await this.prisma.parcours.create({ data });
    return {
      success: true,
      message: 'Parcours ajouté avec succès.',
    };
  }

  async findAll() {
    return this.prisma.parcours.findMany();
  }

  async update(id: number, data: Prisma.ParcoursUpdateInput) {
    await this.prisma.parcours.update({ where: { id }, data });
    return {
      success: true,
      message: 'Parcours modifié avec succès.',
    };
  }

  async delete(id: number) {
    await this.prisma.parcours.delete({ where: { id } });
    return {
      success: true,
      message: 'Parcours supprimé avec succès.',
    };
  }
}
