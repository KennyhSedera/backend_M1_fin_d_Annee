import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GradeService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.GradeCreateInput) {
    await this.prisma.grade.create({ data });
    return {
      success: true,
      message: 'Grade ajouté avec succès.',
    };
  }

  async findAll() {
    return this.prisma.grade.findMany();
  }

  async update(id: number, data: Prisma.GradeUpdateInput) {
    await this.prisma.grade.update({ where: { id }, data });
    return {
      success: true,
      message: 'Grade modifié avec succès.',
    };
  }

  async delete(id: number) {
    await this.prisma.grade.delete({ where: { id } });
    return {
      success: true,
      message: 'Grade ajouté avec succès.',
    };
  }
}
