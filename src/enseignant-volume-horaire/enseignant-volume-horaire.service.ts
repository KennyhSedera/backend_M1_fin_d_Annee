import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
      VH,
    };
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
            parcoursNiveau: true,
          },
        },
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
          totalTheo: { ET: 0, ED: 0, EP: 0 },
          totalPra: { Enc: 0, Sout: 0 },
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
      const tauxSalarie = group.taux;

      const VH =
        (group.totalTheo.ET * 5) / 3 +
        group.totalTheo.ED +
        (group.totalTheo.EP * 2) / 3 +
        group.totalPra.Enc +
        group.totalPra.Sout -
        group.Oblig;

      group.montant = VH * tauxSalarie;
      group.VH = VH;
    }

    const result = Array.from(enseignantMap.values());

    return result;
  }

  async findAllEC(data: parcoursNiveauDto) {
    const parcoursNiveaux = await this.prisma.parcoursNiveau.findMany({
      where: {
        anneeUniversitaire: data.anneeUniversitaire,
        parcours: {
          nom: data.parcoursNom,
          mention: {
            nom: data.mentionNom,
          },
        },
      },
      select: {
        id: true,
        anneeUniversitaire: true,
        nombreEtudiants: true,
        nombreGroupesED: true,
        nombreGroupesET: true,
        nombreGroupesEP: true,
        niveau: true,
        parcours: {
          include: {
            mention: true,
          },
        },
        volumesHoraire: {
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
        },
      },
    });

    const result = parcoursNiveaux.map((parcoursNiveau) => {
      const volumesHoraires = parcoursNiveau.volumesHoraire.map(
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
    const result = await this.prisma.enseignant.findMany({
      where: {
        enseignantVolumeHoraire: {
          some: {
            volumeHoraire: {
              parcoursNiveau: {
                anneeUniversitaire: data.anneeUniversitaire,
                parcours: {
                  nom: data.parcoursNom,
                  mention: {
                    nom: data.mentionNom,
                  },
                },
              },
            },
          },
        },
      },
      select: {
        codeEns: true,
        nom: true,
        prenom: true,
        enseignantVolumeHoraire: {
          select: {
            volumeHoraire: {
              select: {
                elementConstitutif: true,
                semestre: true,
                et: true,
                ed: true,
                ep: true,
                uniteEnseignement: {
                  select: {
                    name: true,
                  },
                },
                parcoursNiveau: {
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
                },
              },
            },
          },
        },
      },
    });

    const formattedResult = result.reduce((acc, enseignant) => {
      enseignant.enseignantVolumeHoraire.forEach((volHoraire) => {
        const parcoursName =
          volHoraire.volumeHoraire.parcoursNiveau?.parcours.nom;

        if (parcoursName === data.parcoursNom) {
          let enseignantEntry = acc.find(
            (entry) => entry.CE === enseignant.codeEns,
          );

          if (!enseignantEntry) {
            enseignantEntry = {
              CE: enseignant.codeEns,
              enseignantResponsable: `${enseignant.nom} ${enseignant.prenom}`,
              elementConstitutif: [],
            };
            acc.push(enseignantEntry);
          }

          enseignantEntry.elementConstitutif.push({
            EC: volHoraire.volumeHoraire.elementConstitutif,
            Sem: volHoraire.volumeHoraire.semestre,
            VH:
              (volHoraire.volumeHoraire.et || 0) +
              (volHoraire.volumeHoraire.ed || 0) +
              (volHoraire.volumeHoraire.ep || 0),
            ET_Base: volHoraire.volumeHoraire.et || 0,
            ET_GR:
              volHoraire.volumeHoraire.parcoursNiveau?.nombreGroupesET || 1,
            ET_TT:
              (volHoraire.volumeHoraire.et || 0) *
              (volHoraire.volumeHoraire.parcoursNiveau?.nombreGroupesET || 1),
            ED_Base: volHoraire.volumeHoraire.ed || 0,
            ED_GR:
              volHoraire.volumeHoraire.parcoursNiveau?.nombreGroupesED || 1,
            ED_TT:
              (volHoraire.volumeHoraire.ed || 0) *
              (volHoraire.volumeHoraire.parcoursNiveau?.nombreGroupesED || 1),
            EP_Base: volHoraire.volumeHoraire.ep || 0,
            EP_GR:
              volHoraire.volumeHoraire.parcoursNiveau?.nombreGroupesEP || 1,
            EP_Total:
              (volHoraire.volumeHoraire.ep || 0) *
              (volHoraire.volumeHoraire.parcoursNiveau?.nombreGroupesEP || 1),
          });
        }
      });

      return acc;
    }, []);

    const output = {
      anneeUniversitaire: data.anneeUniversitaire,
      mention: data.mentionNom,
      parcours: data.parcoursNom,
      enseignants: formattedResult,
    };

    return output;
  }

  async findAllEnsEcVh(data: parcoursNiveauDto) {
    const result = await this.prisma.enseignantVolumeHoraire.findMany({
      where: {
        volumeHoraire: {
          parcoursNiveau: {
            parcours: {
              nom: data.parcoursNom,
              mention: {
                nom: data.mentionNom,
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
