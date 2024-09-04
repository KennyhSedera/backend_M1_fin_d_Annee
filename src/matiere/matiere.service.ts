import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MatiereService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MatiereCreateInput) {
    return this.prisma.matiere.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.matiere.findMany();
  }

  async findOne(id: number) {
    return this.prisma.matiere.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.MatiereUpdateInput) {
    return this.prisma.matiere.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.matiere.delete({
      where: { id },
    });
  }
}
