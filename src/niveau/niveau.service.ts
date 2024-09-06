import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NiveauService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.NiveauCreateInput) {
    await this.prisma.niveau.create({ data });
    return {
      success: true,
      message: 'Niveau ajouté avec succès.',
    };
  }

  async findAll() {
    return this.prisma.niveau.findMany();
  }

  async update(id: number, data: Prisma.NiveauUpdateInput) {
    await this.prisma.niveau.update({ where: { id }, data });
    return {
      success: true,
      message: 'Niveau modifié avec succès.',
    };
  }

  async delete(id: number) {
    await this.prisma.niveau.delete({ where: { id } });
    return {
      success: true,
      message: 'Niveau supprimé avec succès.',
    };
  }
}
