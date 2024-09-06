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
