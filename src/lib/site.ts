export const SITE = {
  url: "https://sandrapautonnier.com",
  nom: "Sukiweb",
  nomComplet: "Sukiweb - Sandra Pautonnier",
  personne: "Sandra Pautonnier",
  metier: "Développeuse web & cheffe de projet digitale",
  email: "contact@sandrapautonnier.com",
  telephone: "+33756845015",
  ville: "Le Mans",
  codePostal: "72000",
  region: "Sarthe",
  pays: "FR",
  ogImage: "/Sukiweb.jpg",
  ogImageAlt:
    "Sandra Pautonnier - Cheffe de projet digitale & développeuse web au Mans",
  horaires: "Mo-Fr 10:00-17:00",
  reseaux: [
    "https://www.linkedin.com/in/sandra-pautonnier/",
    "https://github.com/SandraPautonnier",
    "https://www.facebook.com/people/Sandra-Créatrice-Web-Intuitive/100063567206449/",
  ],
} as const;

/**
 * Zone desservie : activité exercée dans toute la France, avec un ancrage
 * local sur Le Mans (base) et Paris (siège social déclaré aux mentions
 * légales). Les zones les plus précises servent le référencement local.
 */
export const ZONE_DESSERVIE = [
  { "@type": "Country", name: "France" },
  { "@type": "AdministrativeArea", name: "Pays de la Loire" },
  { "@type": "AdministrativeArea", name: "Sarthe" },
  { "@type": "City", name: "Le Mans" },
  { "@type": "City", name: "Paris" },
];
