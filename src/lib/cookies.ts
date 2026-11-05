/**
 * Inventaire réel des traceurs du site, relevé sur le site construit le
 * 4 novembre 2026, navigateur vidé, sans aucune interaction.
 *
 * Cette liste alimente la section « Cookies » des mentions légales : la page
 * décrit ce que le site fait vraiment, pas ce qu'on aimerait qu'il fasse.
 *
 * SI UNE MESURE D'AUDIENCE EST AJOUTÉE, METTRE CETTE LISTE À JOUR. Poser un
 * script dans BaseLayout.astro sans revenir ici laisserait les mentions
 * légales annoncer un site sans cookie alors qu'il en dépose.
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

/**
 * Vide : le site lui-même ne dépose aucun cookie.
 *
 * Google Analytics en déposait quatre (`_ga`, `_ga_GM6HT25D18`, `_gid` et
 * `_gat_gtag_UA_196212309_1`) dès l'ouverture de n'importe quelle page. Il a
 * été retiré : le besoin se limitait à compter les visiteurs, ce que les
 * statistiques du serveur font sans rien déposer ni demander.
 *
 * Reste le cas de Calendly, qui dépose ses propres cookies à l'intérieur de
 * son iframe, sur son domaine. Ils ne sont ni lisibles ni maîtrisés depuis
 * ce site : la section Cookies les mentionne à part. Depuis que l'agenda ne
 * se charge qu'au clic, rien n'est déposé tant que le visiteur ne l'a pas
 * demandé.
 */
export const TRACEURS: Traceur[] = [];

/** Services tiers contactés par le navigateur du visiteur. */
export const SERVICES_TIERS = [
  {
    nom: "Calendly",
    hotes: "calendly.com, assets.calendly.com",
    quand:
      "Uniquement si vous cliquez sur « Afficher l'agenda », sur la page Contact.",
  },
  {
    nom: "EmailJS",
    hotes: "api.emailjs.com",
    quand: "Uniquement à l'envoi du formulaire de contact.",
  },
];
