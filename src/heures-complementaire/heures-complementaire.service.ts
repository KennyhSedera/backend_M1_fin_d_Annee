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
        parcoursNiveau: {
          select: { niveau: true },
        },
      },
      orderBy: { parcoursNiveauId: 'asc' },
    });

    const data = result.map((hc) => ({
      id: hc.id,
      codeEns: hc.enseignant.codeEns,
      nomEns: hc.enseignant.nom + ' ' + hc.enseignant.prenom,
      UE: hc.uniteEnseignement,
      niveau: hc.parcoursNiveau.niveau.nom,
      enc: {
        nb: hc.nbEncadrement,
        taux: hc.tauxEncadrement,
        total: hc.nbEncadrement * hc.tauxEncadrement,
      },
      sout: {
        nb: hc.nbSoutenance,
        taux: hc.tauxSoutenance,
        total: hc.nbSoutenance * hc.tauxSoutenance,
      },
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
          include: {
            parcoursNiveau: { select: { niveau: { select: { nom: true } } } },
          },
        },
      },
    });

    const output = result.filter((res) => res.heuresComplementaires.length > 0);

    const formatted = output.map((out) => ({
      codeEns: out.codeEns,
      nom: out.nom + ' ' + out.prenom,
      HeuresComplementaire: out.heuresComplementaires.map((hc) => ({
        Objet: hc.uniteEnseignement,
        Niveau: hc.parcoursNiveau.niveau.nom,
        Enc: {
          Nb: hc.nbEncadrement,
          Taux: hc.tauxEncadrement,
          Total: hc.nbEncadrement * hc.tauxEncadrement,
        },
        Sout: {
          Nb: hc.nbSoutenance,
          Taux: hc.tauxSoutenance,
          Total: hc.nbSoutenance * hc.tauxSoutenance,
        },
        TotalHeuresEd:
          hc.nbEncadrement * hc.tauxEncadrement +
          hc.nbSoutenance * hc.tauxSoutenance,
      })),
    }));

    return formatted;
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
