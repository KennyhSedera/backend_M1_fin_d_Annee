import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EncadrementSoutenanceService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.EncadrementSoutenanceCreateInput) {
    await this.prisma.encadrementSoutenance.create({ data });
    return {
      success: true,
      message: 'Heure encadrement et soutenace ajouté avec succès.',
    };
  }

  async findAllEnsEncSout() {
    const result = await this.prisma.encadrementSoutenance.findMany({
      include: {
        enseignant: {
          select: {
            codeEns: true,
            nom: true,
            prenom: true,
          },
        },
        niveau: {
          select: { nom: true },
        },
      },
      orderBy: { niveauId: 'asc' },
    });

    const data = result.map((hc) => ({
      id: hc.id,
      codeEns: hc.enseignant.codeEns,
      nomEns: hc.enseignant.nom + ' ' + hc.enseignant.prenom,
      UE: hc.Objet,
      niveau: hc.niveau.nom,
      nbEncadrement: hc.nbEncadrement,
      tauxEncadrement: hc.tauxEncadrement,
      totalEncadrement: hc.nbEncadrement * hc.tauxEncadrement,
      nbSoutenance: hc.nbSoutenance,
      tauxSoutenance: hc.tauxSoutenance,
      totalSoutenance: hc.nbSoutenance * hc.tauxSoutenance,
      total_HC_RD:
        hc.nbSoutenance * hc.tauxSoutenance +
        hc.nbEncadrement * hc.tauxEncadrement,
    }));

    return data;
  }

  async findAllGroupByEns() {
    const result = await this.prisma.enseignant.findMany({
      where: {},
      select: {
        codeEns: true,
        nom: true,
        prenom: true,
        encadrementSoutenances: {
          select: {
            Objet: true,
            nbEncadrement: true,
            tauxEncadrement: true,
            nbSoutenance: true,
            tauxSoutenance: true,
            niveau: true,
          },
        },
      },
    });

    const formattedData = result
      .filter((ens) => ens.encadrementSoutenances.length > 0)
      .map((ens) => ({
        codeEns: ens.codeEns,
        nom: `${ens.nom} ${ens.prenom}`,
        EncadrementSoutenance: ens.encadrementSoutenances.map((hc) => ({
          uniteEnseignement: hc.Objet,
          niveau: hc.niveau.nom,
          nbEncadrement: hc.nbEncadrement,
          tauxEncadrement: hc.tauxEncadrement,
          totalEncadrement: hc.nbEncadrement * hc.tauxEncadrement,
          nbSoutenance: hc.nbSoutenance,
          tauxSoutenance: hc.tauxSoutenance,
          totalSoutenance: hc.nbSoutenance * hc.tauxSoutenance,
          total:
            hc.nbEncadrement * hc.tauxEncadrement +
            hc.nbSoutenance * hc.tauxSoutenance,
        })),
      }));

    return formattedData;
  }

  async update(id: number, data: Prisma.EncadrementSoutenanceUpdateInput) {
    await this.prisma.encadrementSoutenance.update({ where: { id }, data });
    return {
      success: true,
      message: 'Heure encadrement et soutenace modifié avec succès.',
    };
  }

  async delete(id: number) {
    await this.prisma.encadrementSoutenance.delete({ where: { id } });
    return {
      success: true,
      message: 'Heure encadrement et soutenace supprimé avec succès.',
    };
  }
}
