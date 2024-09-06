import { VolumeHoraireController } from './volume-horaire.controller';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VolumeHoraireService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.VolumeHoraireCreateInput) {
    await this.prisma.volumeHoraire.create({ data });
    return {
      success: true,
      message: 'Volume Horaire ajouté avec succès.',
    };
  }

  async findAll() {
    return this.prisma.volumeHoraire.findMany({
      include: {
        uniteEnseignement: true,
        parcoursNiveau: {
          include: { 
            niveau: true, 
            parcours: true 
          },
        },
      },
    });
  }

  async update(id: number, data: Prisma.VolumeHoraireUpdateInput) {
    await this.prisma.volumeHoraire.update({ where: { id }, data });
    return {
      success: true,
      message: 'Volume Horaire modifié avec succès.',
    };
  }

  async delete(id: number) {
    await this.prisma.volumeHoraire.delete({ where: { id } });
    return {
      success: true,
      message: 'Volume Horaire supprimé avec succès.',
    };
  }
}
