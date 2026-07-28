export const PRICING = {
  bases: {
    onePage: { label: "Site One Page", min: 390, max: 390 },
    pages2to4: { label: "Site 2 à 4 pages", min: 690, max: 690 },
    pages5plus: { label: "Site 5 pages et plus", min: 890, max: 890 },

    ecommerceSimple: { label: "Boutique en ligne Essentielle (SumUp)", min: 790, max: 790 },
    ecommerceAdvanced: { label: "Boutique en ligne Évolutive (Shopify)", min: 990, max: 990 },

    refonte: { label: "Refonte de site", min: 590, max: 890 },
    auditVisibility: { label: "Audit de visibilité", min: 290, max: 290 },
  },

  included: {
    seoBasic: "SEO de base (structure + balises + indexabilité)",
    accessibility: "Accessibilité (respect des bonnes pratiques d’accessibilité pour une meilleure expérience pour tous)",
  },

  optionsBasic: {
    contactForm: { label: "Formulaire de contact", min: 50, max: 50 },
    booking: { label: "Réservation / Prise de RDV", min: 50, max: 50 },
    backOffice: { label: "Back-office pour modifier vous-même vos contenus + formation", min: 250, max: 250 },

    seoAdvanced: { label: "SEO avancé (optimisations)", min: 90, max: 90 },
    analyticsBasic: { label: "Google Analytics", min: 50, max: 50 },

    mapSection: { label: "Section lieu avec carte interactive", min: 120, max: 220 },
    thirdPartyFeature: { label: "Fonctionnalité avec un service tiers", min: 50, max: 250 },
    customIdeaHelp: {
      label:
        "J'ai une idée de fonctionnalité mais je ne sais pas comment la définir - pas de panique je suis là pour vous aider",
      min: 190,
      max: 290,
    },
  },

  multilingual: {
    baseFor2: 180,
    perExtra: 90,
  },

  backOfficeModules: {
    blog: { label: "Blog / actualités", min: 120, max: 120 },
    portfolio: { label: "Portfolio / réalisations", min: 120, max: 120 },
    faq: { label: "Témoignages / FAQ / partenaires", min: 80, max: 80 },
    seoFields: { label: "SEO de base (titre, description, image de partage)", min: 60, max: 60 },
  },

  partnerChoices: {
    design: {
      none: { label: "J'ai déjà un super logo et une magnifique charte graphique", min: 0, max: 0 },
      simple: {
        label: "Charte graphique simple (logo simple + éléments graphiques + template réseaux sociaux)",
        min: 90,
        max: 90,
      },
      partner: { label: "Je souhaite faire appel à un(e) graphiste partenaire", min: 0, max: 0, partnerOnly: true },
    },
    copy: {
      none: { label: "J'ai déjà un contenu prêt à l'emploi", min: 0, max: 0 },
      basic: { label: "Rédaction (jusqu’à 5 sections)", min: 180, max: 180 },
      partner: {
        label: "Je souhaite faire appel à un(e) rédacteur(trice) partenaire",
        min: 0,
        max: 0,
        partnerOnly: true,
      },
    },
    social: {
      none: { label: "Je n'ai pas besoin d'aide pour les réseaux sociaux", min: 0, max: 0 },
      basic: { label: "Aide réseaux sociaux (mise en place + conseils)", min: 90, max: 90 },
      partner: {
        label: "Je souhaite faire appel à un(e) community manager partenaire",
        min: 0,
        max: 0,
        partnerOnly: true,
      },
    },
  },

  pages: {
    extraPage: { label: "Page supplémentaire", min: 80, max: 140 },
  },

  ecommerce: {
    products: {
      "0_20": { label: "0 à 20 produits", min: 0, max: 0 },
      "21_50": { label: "21 à 50 produits", min: 250, max: 450 },
      "51_100": { label: "51 à 100 produits", min: 500, max: 900 },
      "101_plus": { label: "101+ produits (sur devis)", min: 0, max: 0 },
    },
    features: {
      shipping: { label: "Configuration livraison / click & collect", min: 90, max: 180 },
      variants: { label: "Variantes (taille/couleur) + organisation", min: 90, max: 220 },
      promos: { label: "Codes promo + règles de réduction", min: 60, max: 140 },
    },
  },

  maintenanceMonthlyByProject: {
    onePage: 29,
    pages2to4: 39,
    pages5plus: 49,
    ecommerceSimple: 29,
    ecommerceAdvanced: 39,
  },
};

export const defaultState = {
  projectType: "pages2to4",
  pagesCount: 2,

  hostingMaintenanceChoice: "noHosting_withMaintenance",
  domainChoice: "already",

  optionsBasic: {
    contactForm: false,
    booking: false,
    backOffice: false,
    seoAdvanced: false,
    analyticsBasic: false,

    mapSection: false,
    thirdPartyFeature: false,
    customIdeaHelp: false,
  },

  multilingualEnabled: false,
  languageCount: 2,

  backOfficeModules: {
    blog: false,
    portfolio: false,
    faq: false,
    seoFields: false,
  },

  designChoice: "none",
  copyChoice: "none",
  socialChoice: "none",

  productsRange: "0_20",
  ecommerceFeatures: {
    shipping: false,
    variants: false,
    promos: false,
  },
};
