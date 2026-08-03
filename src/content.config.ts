import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

// Un fichier JSON par projet : le nom du fichier fait office de slug.
// Permet d'ajouter les prochains projets sans toucher au schéma.
const projets = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projets" }),
  schema: ({ image }) =>
    z.object({
      titre: z.string(),
      // Absent pour les projets personnels et les exercices
      client: z.string().optional(),
      type: z.enum(["client", "personnel", "formation"]),
      statut: z.enum(["en-ligne", "en-developpement", "prive"]),
      // Absente si le projet est privé (derrière login) ou inachevé
      url: z.string().url().optional(),
      // Les projets clients remontent en premier (valeurs les plus basses)
      ordre: z.number(),
      competences: z.array(z.string()),
      annee: z.number(),
      // "AAAA-MM" : conserve le mois affiché sur la page de détail
      // ("juin 2025"). Facultatif : à défaut, seule l'année est affichée.
      date: z
        .string()
        .regex(/^\d{4}-\d{2}$/)
        .optional(),

      // Champs conservés de worksList.json, ils alimentent la page de détail
      category: z.string(),
      cover: image(),
      context: z.string(),
      todo: z.array(z.string()),
      conclusion: z.string(),
      github: z.string().url().optional(),
    }),
});

const services = defineCollection({
  loader: file("./src/content/services.json"),
  schema: z.object({
    id: z.number(),
    icon: z.string(),
    alt: z.string(),
    title: z.string(),
    description: z.string(),
    prix: z.string(),
  }),
});

const competences = defineCollection({
  loader: file("./src/content/competences.json"),
  schema: z.object({
    id: z.number(),
    category: z.string(),
    skills: z.array(z.string()),
  }),
});

export const collections = { projets, services, competences };
