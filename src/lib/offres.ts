/**
 * Contenu des offres, repris mot pour mot de la maquette Services.
 *
 * Une seule source pour la page /services/ et les six pages d'offre : le prix
 * ou une puce ne peuvent pas diverger entre les deux. `src/content/services.json`
 * reste le catalogue court affiché sur l'accueil ; ici se trouve le détail.
 */

export interface LigneTarif {
  texte: string;
  montant?: string;
}

export interface Encart {
  titre: string;
  lignes: { fort?: string; texte: string }[];
  teinte: "sauge";
}

export interface Bloc {
  id: string;
  badge: string;
  teinteBadge: "lilas" | "rose" | "sable" | "encre";
  titre: string;
  chapeau: string;
  points: string[];
  encart?: Encart;
  tarif: {
    label: string;
    montant: string;
    mentions: string[];
    lignes?: LigneTarif[];
    /** Mise en avant, détachée par un filet. */
    avantage?: string;
    complement?: string;
  };
  /** Le bloc Pilotage est sur fond encre dans la maquette. */
  theme?: "encre";
  /**
   * Lien « Exemple : … » affiché dans le bloc sur /services/. Seuls deux
   * blocs en portent un dans la maquette. Les pages d'offre ont leur propre
   * liste, dans OFFRES.
   */
  exemple?: { slug: string; libelle: string };
}

export interface Offre {
  slug: string;
  h1: string;
  title: string;
  description: string;
  /** Bloc de la maquette dont la page reprend le contenu. */
  bloc: string;
  /** Projets qui prouvent l'offre. */
  projets: { slug: string; libelle: string }[];
  /** Questions de la FAQ qui concernent cette offre. */
  faq: string[];
  /**
   * Prix pour les données structurées : « minimum » pour une offre à partir
   * d'un montant, « fixe » pour un forfait. Absent si le tarif est sur devis.
   */
  prix?: { valeur: number; type: "minimum" | "fixe" };
  /** Intitulé du service pour les données structurées. */
  serviceType: string;
}

// --- Blocs d'offre, dans l'ordre de la maquette ------------------------------

export const BLOCS: Bloc[] = [
  {
    id: "creation",
    badge: "Pour lancer ou refaire votre site",
    teinteBadge: "lilas",
    titre: "Création & refonte de site",
    chapeau:
      "Pour les indépendants, commerçants, artisans et associations qui veulent un site professionnel, rapide et trouvable sur Google.",
    points: [
      "Cadrage de vos objectifs et de votre clientèle",
      "Arborescence et maquette validées avant développement",
      "Site sur mesure, adapté au mobile et accessible",
      "Référencement de base : structure, vitesse, référencement local",
      "Mise en ligne et prise en main",
    ],
    encart: {
      titre: "En option après la mise en ligne : maintenance à 59 € / mois",
      teinte: "sauge",
      lignes: [
        {
          texte:
            "Mises à jour, sauvegardes, surveillance et jusqu'à 1 h de modifications par mois. Sans engagement.",
        },
      ],
    },
    tarif: {
      label: "À partir de",
      montant: "1 500 €",
      mentions: [
        "Délai indicatif : 4 à 6 semaines",
        "Paiement en 3 fois : 30 % à la commande, 40 % à la validation de la maquette, 30 % à la mise en ligne",
      ],
    },
  },
  {
    id: "audit",
    badge: "Votre site existe mais ne ressort pas",
    teinteBadge: "rose",
    titre: "Audit SEO & performance",
    chapeau:
      "Un diagnostic clair de ce qui freine votre site, et un plan d'action classé par priorité : vous savez quoi corriger, et dans quel ordre.",
    points: [
      "Analyse technique : indexation, vitesse, mobile",
      "Contenus et mots-clés de votre activité",
      "Référencement local et fiche d'établissement Google",
      "Comparaison avec vos concurrents",
      "Rapport priorisé et restitution en visio",
    ],
    tarif: {
      label: "Forfait",
      montant: "900 €",
      mentions: ["Délai indicatif : 2 semaines"],
      avantage:
        "Déduit du prix de votre site si vous me confiez la création dans les 3 mois.",
    },
  },
  {
    id: "ia",
    badge: "Pour gagner du temps au quotidien",
    teinteBadge: "sable",
    titre: "IA & automatisation",
    chapeau:
      "E-mails, devis, publications, relances, saisies en double : une partie de ces tâches peut déjà être confiée à l'IA ou automatisée. Je vous aide à choisir les bons outils, je les mets en place et je vous apprends à vous en servir, sans jargon.",
    points: [
      "Repérage des tâches répétitives qui vous prennent du temps",
      "Choix d'outils d'IA adaptés à votre activité et à votre budget",
      "Automatisations entre vos outils (Make, API)",
      "Atelier de prise en main, seul ou avec votre équipe",
    ],
    exemple: { slug: "vela", libelle: "les automatisations du projet VELA" },
    encart: {
      titre: "Une IA raisonnée",
      teinte: "sauge",
      lignes: [
        {
          fort: "Vos données d'abord.",
          texte:
            "Je vous dis où elles sont stockées, je privilégie les outils hébergés en Europe quand c'est possible, et aucune donnée sensible ne passe par un outil grand public. RGPD compris.",
        },
        {
          fort: "Avec sobriété.",
          texte:
            "L'IA consomme beaucoup d'énergie : je ne l'utilise que là où elle fait vraiment gagner du temps. Souvent, une simple automatisation suffit.",
        },
      ],
    },
    tarif: {
      label: "Atelier découverte, à partir de",
      montant: "190 €",
      mentions: [],
      lignes: [
        { texte: "2 h en visio, individuel :", montant: "190 €" },
        { texte: "3 h chez vous, Le Mans et alentours :", montant: "390 €" },
        { texte: "Demi-journée en équipe, 3 à 8 personnes :", montant: "690 €" },
      ],
      complement:
        "Mise en place d'outils et automatisations : sur devis, dès 300 €.",
      avantage: "L'atelier est déduit si vous me confiez ensuite la mise en place.",
    },
  },
  {
    id: "pilotage",
    badge: "Pour les projets plus ambitieux",
    teinteBadge: "encre",
    titre: "Pilotage de projet digital",
    theme: "encre",
    chapeau:
      "Vous avez un projet numérique (application, plateforme, outils à connecter) mais pas de chef de projet en interne. Je prends ce rôle, à temps partiel.",
    points: [
      "Cadrage, priorités et feuille de route",
      "Coordination des outils et des prestataires",
      "Automatisations entre vos outils (Make, API…)",
      "Suivi du planning et des livrables",
    ],
    exemple: { slug: "vela", libelle: "le projet VELA" },
    tarif: {
      label: "Tarif",
      montant: "Sur devis",
      mentions: [
        "Mission ponctuelle, ou accompagnement de 1 à 3 jours par semaine",
      ],
    },
  },
];

/** Le bloc associations a sa propre mise en page dans la maquette. */
export const BLOC_ASSOCIATIONS = {
  id: "associations",
  titre: "Vous êtes une association ?",
  chapeau:
    "Les associations font un travail précieux avec des budgets serrés. Je leur réserve un tarif solidaire : −25 % sur la création de site, la maintenance et les ateliers IA, pour gagner du temps sur l'administratif, la communication ou la gestion des bénévoles.",
  /** La remise est mise en gras dans la maquette. */
  remise: "−25 %",
  precision: "Réservé aux associations loi 1901.",
};

export const MENTION_TVA = "Prix nets. TVA non applicable, art. 293 B du CGI.";

export const GARANTIES_SERVICES = [
  "Le Mans, Sarthe et partout en France à distance",
  "Paiement en 3 fois",
  "Vous restez propriétaire de votre site",
];

// --- Méthode ------------------------------------------------------------------

export const METHODE = [
  {
    numero: "01",
    titre: "Échange",
    texte: "30 minutes pour comprendre votre activité et vos objectifs.",
  },
  {
    numero: "02",
    titre: "Proposition",
    texte: "Un devis détaillé, un planning et des étapes claires.",
  },
  {
    numero: "03",
    titre: "Réalisation",
    texte: "Vous validez chaque étape, rien ne part en ligne sans votre accord.",
  },
  {
    numero: "04",
    titre: "Mise en ligne & suivi",
    texte: "Prise en main, référencement et maintenance si besoin.",
  },
];

// --- FAQ ------------------------------------------------------------------------

export const FAQ = [
  {
    id: "delai",
    question: "Combien de temps faut-il pour créer un site ?",
    reponse:
      "Comptez 4 à 6 semaines pour un site vitrine, du premier échange à la mise en ligne. Le délai dépend surtout de deux choses : le nombre de pages, et le temps nécessaire pour réunir vos textes et vos photos.",
  },
  {
    id: "modifier",
    question: "Pourrai-je modifier mon site moi-même ?",
    reponse:
      "Oui, en option : je peux mettre en place un espace simple pour modifier vos textes et vos photos. Cette option s'ajoute au prix de la création, je la chiffre dans le devis. Vous préférez ne pas y toucher ? Les petites modifications sont incluses dans la maintenance.",
  },
  {
    id: "domaine",
    question: "Le nom de domaine et l'hébergement sont-ils inclus ?",
    reponse:
      "Non, ils sont facturés à part, et à votre nom : vous restez propriétaire de votre site. Comptez en général 10 à 15 € par an pour un nom de domaine en .fr et 20 à 50 € par an pour un hébergement mutualisé. Je m'occupe de la mise en place.",
  },
  {
    id: "distance",
    question: "Travaillez-vous en dehors du Mans ?",
    reponse:
      "Oui. Je suis basée en Sarthe et je travaille à distance partout en France. Pour les clients du Mans et des environs, les rendez-vous peuvent aussi se faire en personne.",
  },
  {
    id: "ia-debutant",
    question:
      "L'IA, c'est pour moi si je ne suis pas à l'aise avec l'informatique ?",
    reponse:
      "Oui, c'est même pour vous qu'elle est la plus utile. On part de vos tâches concrètes, pas de la technologie. Je choisis avec vous un ou deux outils simples, je les installe et je vous montre comment les utiliser au quotidien.",
  },
];

// --- Les six pages d'offre --------------------------------------------------------

export const OFFRES: Offre[] = [
  {
    slug: "creation-site-internet-le-mans",
    h1: "Création de site internet au Mans",
    title: "Création de site internet au Mans dès 1 500 € | Sukiweb",
    description:
      "Création de site internet sur mesure au Mans : cadrage, maquette validée, site rapide et référencé localement. À partir de 1 500 €.",
    bloc: "creation",
    serviceType: "Création de site internet",
    prix: { valeur: 1500, type: "minimum" },
    projets: [
      { slug: "location-voiture-cassis", libelle: "Location Voiture Cassis" },
    ],
    faq: ["delai", "modifier", "domaine", "distance"],
  },
  {
    slug: "refonte-site-web",
    h1: "Refonte de site internet au Mans",
    title: "Refonte de site internet au Mans | Sukiweb",
    description:
      "Refonte de site internet au Mans : un site repris de la structure au référencement, adapté au mobile et prêt à évoluer.",
    bloc: "creation",
    serviceType: "Refonte de site internet",
    prix: { valeur: 1500, type: "minimum" },
    projets: [
      {
        slug: "le-mans-school-of-ai",
        libelle: "Refonte du site de Le Mans School of AI",
      },
    ],
    faq: ["delai", "modifier", "domaine", "distance"],
  },
  {
    slug: "audit-seo",
    h1: "Audit SEO au Mans",
    title: "Audit SEO au Mans – 900 € déduits de la création",
    description:
      "Audit SEO et performance au Mans : ce qui freine votre site et un plan d'action priorisé. 900 €, déduits si vous confiez la création.",
    bloc: "audit",
    serviceType: "Audit SEO et performance",
    prix: { valeur: 900, type: "fixe" },
    projets: [],
    faq: ["distance"],
  },
  {
    slug: "ia-automatisation",
    h1: "IA & automatisation pour TPE et associations",
    title: "Ateliers IA et automatisation au Mans dès 190 € | Sukiweb",
    description:
      "Ateliers IA et automatisation au Mans pour TPE et associations : les bons outils, mis en place et expliqués sans jargon. Dès 190 €.",
    bloc: "ia",
    serviceType: "Ateliers IA et automatisation",
    prix: { valeur: 190, type: "minimum" },
    projets: [
      { slug: "vela", libelle: "les automatisations du projet VELA" },
    ],
    faq: ["ia-debutant", "distance"],
  },
  {
    slug: "gestion-de-projet-digital",
    h1: "Cheffe de projet digital freelance au Mans",
    title: "Cheffe de projet digital freelance au Mans | Sukiweb",
    description:
      "Cheffe de projet digital freelance au Mans : cadrage, coordination des prestataires, automatisations et suivi des livrables. Sur devis.",
    bloc: "pilotage",
    serviceType: "Gestion de projet digital",
    projets: [{ slug: "vela", libelle: "le projet VELA" }],
    faq: ["distance"],
  },
  {
    slug: "site-internet-association",
    h1: "Site internet pour association : tarif solidaire",
    title: "Site internet pour association, tarif solidaire | Sukiweb",
    description:
      "Site internet pour association loi 1901 : −25 % sur la création, la maintenance et les ateliers IA. Au Mans et à distance.",
    bloc: "associations",
    serviceType: "Création de site internet pour association",
    projets: [
      { slug: "pulsar42", libelle: "Contribution au site d'une association" },
      {
        slug: "le-mans-school-of-ai",
        libelle: "Refonte du site de Le Mans School of AI",
      },
    ],
    faq: ["delai", "modifier", "domaine", "distance"],
  },
];
