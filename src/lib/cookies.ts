/**
 * Inventaire réel des traceurs du site, relevé sur le site construit le
 * 4 novembre 2026, navigateur vidé, sans aucune interaction.
 *
 * Cette liste alimente la section « Cookies » des mentions légales : la page
 * décrit ce que le site fait vraiment, pas ce qu'on aimerait qu'il fasse.
 *
 * SI LA MESURE D'AUDIENCE CHANGE, METTRE CETTE LISTE À JOUR. Retirer Google
 * Analytics de BaseLayout.astro sans toucher ici laisserait les mentions
 * légales annoncer des cookies qui n'existent plus.
 */

export interface Traceur {
  nom: string;
  depose: string;
  role: string;
  duree: string;
  /** Vrai si le cookie est nécessaire au fonctionnement demandé par le visiteur. */
  essentiel: boolean;
  /** Pages où il apparaît. */
  portee: string;
}

export const TRACEURS: Traceur[] = [
  {
    nom: "_ga",
    depose: "Google Analytics",
    role: "Distingue les visiteurs pour la mesure d'audience.",
    duree: "13 mois",
    essentiel: false,
    portee: "Toutes les pages",
  },
  {
    nom: "_ga_GM6HT25D18",
    depose: "Google Analytics",
    role: "Conserve l'état de la session de mesure.",
    duree: "13 mois",
    essentiel: false,
    portee: "Toutes les pages",
  },
  {
    nom: "_gid",
    depose: "Google Analytics",
    role: "Distingue les visiteurs sur une journée.",
    duree: "24 heures",
    essentiel: false,
    portee: "Toutes les pages",
  },
  {
    nom: "_gat_gtag_UA_196212309_1",
    depose: "Google Analytics",
    role: "Limite le nombre de requêtes envoyées à Google.",
    duree: "1 minute",
    essentiel: false,
    portee: "Toutes les pages",
  },
];

/** Services tiers contactés par le navigateur du visiteur. */
export const SERVICES_TIERS = [
  {
    nom: "Google Analytics",
    hotes: "googletagmanager.com, google-analytics.com",
    quand: "Dès l'ouverture de n'importe quelle page.",
  },
  {
    nom: "Calendly",
    hotes: "calendly.com, assets.calendly.com",
    quand: "Dès l'ouverture de la page Contact, qui intègre l'agenda.",
  },
  {
    nom: "EmailJS",
    hotes: "api.emailjs.com",
    quand: "Uniquement à l'envoi du formulaire de contact.",
  },
];
