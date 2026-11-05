import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

// Un fichier JSON par projet : le nom du fichier fait office de slug.
// Permet d'ajouter les prochains projets sans toucher au schéma.
const projets = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projets" }),
  schema: ({ image }) =>
    z.object({
      // Titre complet : H1 de la fiche projet.
      titre: z.string(),
      // Nom seul : fil d'Ariane, title de la page, aplat de remplacement.
      nomCourt: z.string(),
      // Titre court : libellé de la carte dans les grilles.
      titreCarte: z.string(),
      // Sur-titre de la carte et de la fiche, ex. « Client · KiRoMa ».
      mention: z.string(),

      type: z.enum(["client", "personnel", "formation"]),
      // Pilote l'affichage des liens externes : ni "prive" ni
      // "en-developpement" n'exposent de lien.
      statut: z.enum(["en-ligne", "prive", "en-developpement"]),
      // Texte du badge, libre : « Livré », « Accompagnement continu »…
      statutAffiche: z.string(),

      // Les projets clients remontent en premier (valeurs les plus basses).
      // Sert aussi à la navigation projet précédent / suivant.
      ordre: z.number(),
      aLaUne: z.boolean(),
      brouillon: z.boolean(),
      annee: z.number(),

      // Teinte de la vignette, et de l'aplat quand la capture manque.
      teinte: z.enum(["lilas", "rose", "sauge", "sable"]),
      // Facultative : sans capture, les grilles et la fiche affichent un
      // aplat de la teinte portant le nom du projet.
      cover: image().optional(),
      resume: z.string(),

      // Encadré de la fiche, affiché dans l'ordre du fichier.
      infos: z.array(
        z.object({
          label: z.string(),
          valeur: z.string(),
        }),
      ),
      competences: z.array(z.string()),
      // Vrai quand "Développé avec l'IA" figure dans competences : ce tag
      // reçoit un style à part.
      developpeAvecIA: z.boolean(),

      // Corps de la fiche. Une section porte un texte ou une liste.
      sections: z.array(
        z.object({
          titre: z.string(),
          texte: z.string().optional(),
          liste: z.array(z.string()).optional(),
        }),
      ),

      // Absent pour les projets personnels et les exercices.
      client: z.string().optional(),
      // Absent si le projet est privé (derrière login) ou inachevé.
      lien: z
        .object({
          libelle: z.string(),
          url: z.string().url(),
          // URL affichée, sans protocole.
          texte: z.string(),
        })
        .optional(),
      github: z.string().url().optional(),
      // Uniquement les témoignages réellement recueillis, avec accord.
      temoignage: z
        .object({
          texte: z.string(),
          auteur: z.string(),
          fonction: z.string(),
        })
        .optional(),
    }),
});

const services = defineCollection({
  loader: file("./src/content/services.json"),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    prix: z.string(),
    // Page d'offre correspondante.
    url: z.string(),
  }),
});

export const collections = { projets, services };
