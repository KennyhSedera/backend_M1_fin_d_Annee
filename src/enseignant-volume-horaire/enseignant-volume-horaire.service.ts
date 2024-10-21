import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { arrondissement } from '../increment';
import { parcoursNiveauDto } from './parcoursNiveauDto';

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
          },
        },
      },
    });

    const parcoursNiveaux = await this.prisma.parcoursNiveau.findMany({
      include: {
        parcours: true,
        niveau: true,
      },
    });

    const totalTheo = recordsTheo.reduce(
      (acc, record) => {
        const et = record.volumeHoraire.et || 0;
        const ed = record.volumeHoraire.ed || 0;
        const ep = record.volumeHoraire.ep || 0;

        const parcoursNiveau = parcoursNiveaux.filter(
          (pn) =>
            pn.parcours.id ===
              record.volumeHoraire.uniteEnseignement.parcoursId &&
            pn.niveau.id === record.volumeHoraire.uniteEnseignement.niveauId,
        );

        const nombreGroupesET = parcoursNiveau[0].nombreGroupesET || 0;
        const nombreGroupesED = parcoursNiveau[0].nombreGroupesED || 0;
        const nombreGroupesEP = parcoursNiveau[0].nombreGroupesEP || 0;

        acc.ET += et * nombreGroupesET;
        acc.ED += ed * nombreGroupesED;
        acc.EP += ep * nombreGroupesEP;

        return acc;
      },
      { ET: 0, ED: 0, EP: 0 },
    );

    const recordsPra = await this.prisma.heuresComplementaire.findMany({
      where: { enseignantId: id },
      include: { parcours: true },
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

    const datas = {
      id: recordsTheo[0]?.enseignant.id,
      codeEns: recordsTheo[0]?.enseignant.codeEns,
      nom: recordsTheo[0]?.enseignant.nom + recordsTheo[0]?.enseignant.prenom,
      grade: recordsTheo[0]?.enseignant.grade.title,
      contact: recordsTheo[0]?.enseignant.contact,
      CIN: recordsTheo[0]?.enseignant.CIN,
      ET: totalTheo.ET,
      ED: totalTheo.ED,
      EP: totalTheo.EP,
      Enc: totalPra.Enc,
      Sout: totalPra.Sout,
      salaire: arrondissement(salaire),
      VH: arrondissement(VH),
    };
    return datas;
  }

  async findAll(type: string) {
    const enseignantMap = new Map();

    const recordsTheo = await this.prisma.enseignantVolumeHoraire.findMany({
      where: {
        enseignant: {
          type: type,
        },
      },
      include: {
        enseignant: {
          include: {
            grade: true,
          },
        },
        volumeHoraire: {
          include: {
            uniteEnseignement: true,
          },
        },
      },
    });

    const parcoursNiveaux = await this.prisma.parcoursNiveau.findMany({
      include: {
        parcours: true,
        niveau: true,
      },
    });

    for (const record of recordsTheo) {
      const enseignantId = record.enseignantId;
      const enseignant = record.enseignant;

      if (!enseignantMap.has(enseignantId)) {
        enseignantMap.set(enseignantId, {
          code: enseignant.codeEns,
          nom: enseignant.nom,
          prenom: enseignant.prenom,
          grade: enseignant.grade.title,
          contact: enseignant.contact,
          CIN: enseignant.CIN,
          ET: 0,
          ED: 0,
          EP: 0,
          Enc: 0,
          Sout: 0,
          Oblig: enseignant.Oblig,
          VH: 0,
          taux: enseignant.grade.taux,
          montant: 0,
        });
      }

      const group = enseignantMap.get(enseignantId);

      const et = record.volumeHoraire.et || 0;
      const ed = record.volumeHoraire.ed || 0;
      const ep = record.volumeHoraire.ep || 0;

      const parcoursNiveau = parcoursNiveaux.filter(
        (pn) =>
          pn.parcours.id ===
            record.volumeHoraire.uniteEnseignement.parcoursId &&
          pn.niveau.id === record.volumeHoraire.uniteEnseignement.niveauId,
      );

      const nombreGroupesET = parcoursNiveau[0].nombreGroupesET || 0;
      const nombreGroupesED = parcoursNiveau[0].nombreGroupesED || 0;
      const nombreGroupesEP = parcoursNiveau[0].nombreGroupesEP || 0;

      group.ET += et * nombreGroupesET;
      group.ED += ed * nombreGroupesED;
      group.EP += ep * nombreGroupesEP;
    }

    const recordsPra = await this.prisma.heuresComplementaire.findMany({});

    for (const record of recordsPra) {
      const enseignantId = record.enseignantId;

      if (enseignantMap.has(enseignantId)) {
        const group = enseignantMap.get(enseignantId);

        const nbEnc = record.nbEncadrement || 0;
        const nbSout = record.nbSoutenance || 0;

        const tauxEnc = record.tauxEncadrement || 0;
        const tauxSout = record.tauxSoutenance || 0;

        group.Enc += nbEnc * tauxEnc;
        group.Sout += nbSout * tauxSout;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, group] of enseignantMap) {
      const tauxSalarie = group.taux;

      const VH =
        (group.ET * 5) / 3 +
        group.ED +
        (group.EP * 2) / 3 +
        group.Enc +
        group.Sout -
        group.Oblig;

      group.montant = arrondissement(VH * tauxSalarie);
      group.VH = arrondissement(VH);
    }

    const result = Array.from(enseignantMap.values());

    return result;
  }

  async findAllEC(data: parcoursNiveauDto) {
    const parcoursNiveaux = await this.prisma.parcoursNiveau.findMany({
      where: {
        anneeUniversitaire: data.anneeUniversitaire,
      },
      select: {
        id: true,
        anneeUniversitaire: true,
        nombreEtudiants: true,
        nombreGroupesED: true,
        nombreGroupesET: true,
        nombreGroupesEP: true,
        parcoursId: true,
        niveauId: true,
        niveau: true,
        parcours: {
          include: {
            mention: true,
          },
        },
      },
    });

    const volumeHoraire = await this.prisma.volumeHoraire.findMany({
      include: {
        uniteEnseignement: true,
        enseignantVolumeHoraire: {
          include: {
            enseignant: {
              select: {
                codeEns: true,
                nom: true,
                prenom: true,
              },
            },
          },
        },
      },
    });

    const result = parcoursNiveaux.map((parcoursNiveau) => {
      const volumeHoraireFilter = volumeHoraire.filter(
        (vh) =>
          vh.uniteEnseignement.niveauId === parcoursNiveau.niveauId &&
          vh.uniteEnseignement.parcoursId === parcoursNiveau.parcoursId,
      );
      const volumesHoraires = volumeHoraireFilter.map(
        (volume, i) =>
          volume.enseignantVolumeHoraire.length > 0 && {
            idVH: i + 1,
            codeEns: volume.enseignantVolumeHoraire[0].enseignant.codeEns,
            nomEns:
              volume.enseignantVolumeHoraire[0].enseignant.nom +
              ' ' +
              volume.enseignantVolumeHoraire[0].enseignant.prenom,
            elementConstitutif: volume.elementConstitutif,
            semestre: volume.semestre,
            VH: volume.et + volume.ed + volume.ep || 0,
            etBase: volume.et || 0,
            etGR: (volume.et && parcoursNiveau.nombreGroupesET) || 0,
            etTotal: volume.et * parcoursNiveau.nombreGroupesET || 0,
            edBase: volume.ed || 0,
            edGR: (volume.ed && parcoursNiveau.nombreGroupesED) || 0,
            edTotal: volume.ed * parcoursNiveau.nombreGroupesED || 0,
            epBase: volume.ep || 0,
            epGR: (volume.ep && parcoursNiveau.nombreGroupesEP) || 0,
            epTotal: volume.ep * parcoursNiveau.nombreGroupesEP || 0,
          },
      );

      const Ens_EC_VH = {
        id: parcoursNiveau.id,
        anneeUniversitaire: parcoursNiveau.anneeUniversitaire,
        mention: parcoursNiveau.parcours.mention.nom,
        parcours: parcoursNiveau.parcours.nom,
        niveau: parcoursNiveau.niveau.nom,
        nbEtudiant: parcoursNiveau.nombreEtudiants,
        groupesET: parcoursNiveau.nombreGroupesET,
        groupesED: parcoursNiveau.nombreGroupesED,
        groupesEP: parcoursNiveau.nombreGroupesEP,
        ENS_EC: volumesHoraires,
      };

      return {
        Ens_EC_VH,
      };
    });

    return result;
  }

  async getTeachingData(data: parcoursNiveauDto) {
    const result = await this.prisma.enseignantVolumeHoraire.findMany({
      where: {
        volumeHoraire: {
          uniteEnseignement: {
            parcours: {
              nom: data.parcours,
            },
          },
        },
      },
      select: {
        id: true,
        enseignant: {
          select: {
            codeEns: true,
            nom: true,
            prenom: true,
          },
        },
        volumeHoraire: {
          select: {
            elementConstitutif: true,
            semestre: true,
            ed: true,
            et: true,
            ep: true,
            uniteEnseignement: {
              select: {
                niveauId: true,
                parcoursId: true,
              },
            },
          },
        },
      },
      orderBy: { enseignant: { codeEns: 'asc' } },
    });

    const parcoursNiveau = await this.prisma.parcoursNiveau.findMany({
      select: {
        anneeUniversitaire: true,
        nombreGroupesET: true,
        nombreGroupesED: true,
        nombreGroupesEP: true,
        parcours: {
          select: {
            nom: true,
            mention: {
              select: {
                nom: true,
              },
            },
          },
        },
      },
    });

    const formattedResult = result.reduce((acc, enseignantData) => {
      let enseignantEntry = acc.find(
        (entry) =>
          entry.enseignant.codeEns === enseignantData.enseignant.codeEns,
      );

      if (!enseignantEntry) {
        enseignantEntry = {
          enseignant: enseignantData.enseignant,
          volumeHoraire: [],
        };
        acc.push(enseignantEntry);
      }

      enseignantEntry.volumeHoraire.push({
        elementConstitutif: enseignantData.volumeHoraire.elementConstitutif,
        semestre: enseignantData.volumeHoraire.semestre,
        VH:
          (enseignantData.volumeHoraire.et || 0) +
          (enseignantData.volumeHoraire.ed || 0) +
          (enseignantData.volumeHoraire.ep || 0),
        ET_Base: enseignantData.volumeHoraire.et || 0,
        ET_GR: parcoursNiveau[0]?.nombreGroupesET || 1,
        ET_TT:
          (enseignantData.volumeHoraire.et || 0) *
          (parcoursNiveau[0]?.nombreGroupesET || 1),
        ED_Base: enseignantData.volumeHoraire.ed || 0,
        ED_GR: parcoursNiveau[0]?.nombreGroupesED || 1,
        ED_TT:
          (enseignantData.volumeHoraire.ed || 0) *
          (parcoursNiveau[0]?.nombreGroupesED || 1),
        EP_Base: enseignantData.volumeHoraire.ep || 0,
        EP_GR: parcoursNiveau[0]?.nombreGroupesEP || 1,
        EP_Total:
          (enseignantData.volumeHoraire.ep || 0) *
          (parcoursNiveau[0]?.nombreGroupesEP || 1),
      });

      return acc;
    }, []);

    const output = {
      anneeUniversitaire: data.anneeUniversitaire,
      mention: data.mention,
      parcours: data.parcours,
      enseignants: formattedResult,
    };

    return output;
  }

  async findAllEnsEcVh(data: parcoursNiveauDto) {
    const result = await this.prisma.enseignantVolumeHoraire.findMany({
      where: {
        volumeHoraire: {
          uniteEnseignement: {
            parcours: {
              nom: data.parcours,
              mention: {
                nom: data.mention,
              },
            },
          },
        },
      },
    });
    return result;
  }

  async update(
    id: number,
    data: Prisma.EnseignantVolumeHoraireUncheckedCreateInput,
  ) {
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
