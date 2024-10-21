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

  async findAllEnsEncSout() {
    const result = await this.prisma.heuresComplementaire.findMany({
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
      UE: hc.uniteEnseignement,
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
        heuresComplementaires: {
          select: {
            uniteEnseignement: true,
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
      .filter((ens) => ens.heuresComplementaires.length > 0)
      .map((ens) => ({
        codeEns: ens.codeEns,
        nom: `${ens.nom} ${ens.prenom}`,
        heuresComplementaires: ens.heuresComplementaires.map((hc) => ({
          uniteEnseignement: hc.uniteEnseignement,
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
