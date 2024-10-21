export const decompteTheo = (enseignants, parcourNiveau) => {
  const data = { enseignants, parcourNiveau };

  const results = {};

  data.parcourNiveau.forEach((parcourNiveau) => {
    data.enseignants.forEach((enseignant) => {
      enseignant.enseignantVolumeHoraire.forEach((volume) => {
        const unite = volume.volumeHoraire.uniteEnseignement;

        if (
          unite?.niveau.id === parcourNiveau.niveau.id &&
          unite?.parcours.id === parcourNiveau.parcours.id
        ) {
          const { ed, et, ep } = volume.volumeHoraire;
          const { nombreGroupesED, nombreGroupesEP, nombreGroupesET } =
            parcourNiveau;

          const ET = et * nombreGroupesET;
          const ED = ed * nombreGroupesED;
          const EP = ep * nombreGroupesEP;

          const key = enseignant.codeEns;

          if (!results[key]) {
            results[key] = {
              codeEns: enseignant.codeEns,
              nom: enseignant.nom + enseignant.prenom,
              value: [],
              total: { ET: 0, ED: 0, EP: 0 },
            };
          }

          const parcoursKey = unite.parcours.nom;
          const existingParcours = results[key].value.find(
            (p) => p.parcours === parcoursKey,
          );

          if (existingParcours) {
            existingParcours.volumeHoraire.ET += ET;
            existingParcours.volumeHoraire.ED += ED;
            existingParcours.volumeHoraire.EP += EP;
          } else {
            results[key].value.push({
              parcours: parcoursKey,
              volumeHoraire: {
                ET,
                ED,
                EP,
              },
            });
          }

          results[key].total.ET += ET;
          results[key].total.ED += ED;
          results[key].total.EP += EP;

          delete volume.volumeHoraire.uniteEnseignement;
        }
      });
    });
  });

  const resultArray = Object.values(results);

  const resultat = {
    anneeUnversitaire: parcourNiveau[0].anneeUniversitaire,
    mention: parcourNiveau[0].parcours.mention.nom,
    data: resultArray,
  };

  return resultat;
};
export const decomptePra = (enseignants) => {
  const enseignantsAvecHeures = enseignants.filter(
    (enseignant) => enseignant.heuresComplementaires.length > 0,
  );

  const results = enseignantsAvecHeures.map((enseignant) => {
    const totals = {};
    let totalEncadrementGlobal = 0;
    let totalSoutenanceGlobal = 0;

    enseignant.heuresComplementaires.forEach((heure) => {
      const parcoursKey = heure.parcours.nom;

      if (!totals[parcoursKey]) {
        totals[parcoursKey] = {
          totalEncadrement: 0,
          totalSoutenance: 0,
        };
      }

      const encadrement = heure.nbEncadrement * heure.tauxEncadrement;
      const soutenance = heure.nbSoutenance * heure.tauxSoutenance;

      totals[parcoursKey].totalEncadrement += encadrement;
      totals[parcoursKey].totalSoutenance += soutenance;

      totalEncadrementGlobal += encadrement;
      totalSoutenanceGlobal += soutenance;
    });

    const heuresComplementaires = Object.keys(totals).map((parcours) => ({
      parcours,
      value: [
        {
          Encadrement: totals[parcours].totalEncadrement,
          Soutenance: totals[parcours].totalSoutenance,
        },
      ],
    }));

    return {
      codeEns: enseignant.codeEns,
      nom: enseignant.nom + enseignant.prenom,
      heuresComplementaires,
      Total: {
        Encadrement: totalEncadrementGlobal,
        Soutenance: totalSoutenanceGlobal,
      },
    };
  });

  return results;
};
