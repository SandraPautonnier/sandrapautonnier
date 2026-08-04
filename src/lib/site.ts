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

/** Zone desservie : Sarthe et Pays de la Loire. */
export const ZONE_DESSERVIE = [
  { "@type": "AdministrativeArea", name: "Sarthe" },
  { "@type": "AdministrativeArea", name: "Pays de la Loire" },
];
