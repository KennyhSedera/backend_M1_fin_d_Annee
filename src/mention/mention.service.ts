import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MentionService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MentionCreateInput) {
    await this.prisma.mention.create({ data });
    return {
      success: true,
      message: 'Mention ajouté avec succès.',
    };
  }

  async findAll() {
    return this.prisma.mention.findMany();
  }

  async update(id: number, data: Prisma.MentionUpdateInput) {
    await this.prisma.mention.update({ where: { id }, data });
    return {
      success: true,
      message: 'Mention modifié avec succès.',
    };
  }

  async delete(id: number) {
    await this.prisma.mention.delete({ where: { id } });
    return {
      success: true,
      message: 'Mention supprimé avec succès.',
    };
  }
}
