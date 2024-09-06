import { log } from 'console';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class EnseignantVolumeHoraireService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.EnseignantVolumeHoraireUncheckedCreateInput) {
    const exist = await this.prisma.enseignantVolumeHoraire.findMany({
      where: {
        enseignantId: data.enseignantId,
        volumeHoraireId: data.volumeHoraireId,
      },
    });
    if (exist.length > 0) {
      return {
        success: false,
        message: 'Données existe déjà.',
      };
    }
    await this.prisma.enseignantVolumeHoraire.create({ data });
    return {
      success: true,
      message: 'Données ajouté avec succès.',
    };
  }

  async findOneEns(id: number) {
    const recordsTheo = await this.prisma.enseignantVolumeHoraire.findMany({
      where: { enseignantId: id },
      include: {
        enseignant: {
          include: {
            grade: true,
          },
        },
        volumeHoraire: {
          include: {
            uniteEnseignement: true,
            parcoursNiveau: true,
          },
        },
      },
    });

    const totalTheo = recordsTheo.reduce(
      (acc, record) => {
        const et = record.volumeHoraire.et || 0;
        const ed = record.volumeHoraire.ed || 0;
        const ep = record.volumeHoraire.ep || 0;

        const nombreGroupesET =
          record.volumeHoraire.parcoursNiveau.nombreGroupesET || 0;
        const nombreGroupesED =
          record.volumeHoraire.parcoursNiveau.nombreGroupesED || 0;
        const nombreGroupesEP =
          record.volumeHoraire.parcoursNiveau.nombreGroupesEP || 0;

        acc.ET += et * nombreGroupesET;
        acc.ED += ed * nombreGroupesED;
        acc.EP += ep * nombreGroupesEP;

        return acc;
      },
      { ET: 0, ED: 0, EP: 0 },
    );

    const recordsPra = await this.prisma.heuresComplementaire.findMany({
      where: { enseignantId: id },
      include: {
        parcoursNiveau: {
          include: { parcours: true },
        },
      },
    });

    const totalPra = recordsPra.reduce(
      (acc, record) => {
        const nbEnc = record.nbEncadrement || 0;
        const nbSout = record.nbSoutenance || 0;

        const tauxEnc = record.tauxEncadrement || 0;
        const tauxSout = record.tauxSoutenance || 0;

        acc.Enc += nbEnc * tauxEnc;
        acc.Sout += nbSout * tauxSout;

        return acc;
      },
      { Enc: 0, Sout: 0 },
    );

    const tauxSalarie = recordsTheo[0].enseignant.grade.taux;

    const VH =
      (totalTheo.ET * 5) / 3 +
      totalTheo.ED +
      (totalTheo.EP * 2) / 3 +
      totalPra.Enc +
      totalPra.Sout;

    const salaire = VH * tauxSalarie;

    return {
      enseignant: recordsTheo[0]?.enseignant,
      totalTheo,
      totalPra,
      salaire,
    };
  }

  async findAll() {
    const recordsTheo = await this.prisma.enseignantVolumeHoraire.findMany({
      include: {
        enseignant: {
          include: {
            grade: true,
          },
        },
        volumeHoraire: {
          include: {
            uniteEnseignement: true,
            parcoursNiveau: true,
          },
        },
      },
    });

    const enseignantMap = new Map();

    for (const record of recordsTheo) {
      const enseignantId = record.enseignantId;
      const enseignant = record.enseignant;

      if (!enseignantMap.has(enseignantId)) {
        enseignantMap.set(enseignantId, {
          enseignant,
          totalTheo: { ET: 0, ED: 0, EP: 0 },
          totalPra: { Enc: 0, Sout: 0 },
          salaire: 0,
        });
      }

      const group = enseignantMap.get(enseignantId);

      const et = record.volumeHoraire.et || 0;
      const ed = record.volumeHoraire.ed || 0;
      const ep = record.volumeHoraire.ep || 0;

      const nombreGroupesET =
        record.volumeHoraire.parcoursNiveau.nombreGroupesET || 0;
      const nombreGroupesED =
        record.volumeHoraire.parcoursNiveau.nombreGroupesED || 0;
      const nombreGroupesEP =
        record.volumeHoraire.parcoursNiveau.nombreGroupesEP || 0;

      group.totalTheo.ET += et * nombreGroupesET;
      group.totalTheo.ED += ed * nombreGroupesED;
      group.totalTheo.EP += ep * nombreGroupesEP;
    }

    const recordsPra = await this.prisma.heuresComplementaire.findMany({
      include: {
        parcoursNiveau: {
          include: { parcours: true },
        },
      },
    });

    for (const record of recordsPra) {
      const enseignantId = record.enseignantId;

      if (enseignantMap.has(enseignantId)) {
        const group = enseignantMap.get(enseignantId);

        const nbEnc = record.nbEncadrement || 0;
        const nbSout = record.nbSoutenance || 0;

        const tauxEnc = record.tauxEncadrement || 0;
        const tauxSout = record.tauxSoutenance || 0;

        group.totalPra.Enc += nbEnc * tauxEnc;
        group.totalPra.Sout += nbSout * tauxSout;
      }
    }

    for (const [_, group] of enseignantMap) {
      const tauxSalarie = group.enseignant.grade.taux;

      const VH =
        (group.totalTheo.ET * 5) / 3 +
        group.totalTheo.ED +
        (group.totalTheo.EP * 2) / 3 +
        group.totalPra.Enc +
        group.totalPra.Sout;

      group.salaire = VH * tauxSalarie;
    }

    const result = Array.from(enseignantMap.values());

    return result;
  }

  async update(id: number, data) {
    const exist = await this.prisma.enseignantVolumeHoraire.findMany({
      where: {
        enseignantId: data.enseignantId,
        volumeHoraireId: data.volumeHoraireId,
      },
    });
    if (exist.length > 0) {
      return {
        success: false,
        message: 'Données existe déjà.',
      };
    }
    await this.prisma.enseignantVolumeHoraire.update({
      where: { id: id },
      data: data,
    });
    return {
      success: true,
      message: 'Données modifié avec succès.',
    };
  }

  async delete(id: number) {
    const res = await this.prisma.enseignantVolumeHoraire.delete({
      where: { id },
    });
    if (res) {
      return {
        success: true,
        message: 'Données supprimé avec succès.',
      };
    }
  }
}
