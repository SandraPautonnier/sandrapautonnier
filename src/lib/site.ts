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
  siret: "883 204 356 00033",
  ogImage: "/Sukiweb.jpg",
  ogImageAlt:
    "Sandra Pautonnier - Cheffe de projet digitale & développeuse web au Mans",
  horaires: "Mo-Fr 10:00-17:00",
  reseaux: [
    "https://www.linkedin.com/in/sandrapautonnier/",
    "https://github.com/SandraPautonnier",
    "https://www.facebook.com/people/Sandra-Créatrice-Web-Intuitive/100063567206449/",
  ],
} as const;

/**
 * Agenda de réservation. Tous les boutons « Réserver un appel » du site
 * pointent sur cette seule adresse.
 */
export const BOOKING_URL = "https://calendly.com/sandrapautonnier/rdv";

/**
 * Deux adresses exposées : Le Mans, base opérationnelle et ancrage local
 * principal (donc en premier), et Paris, siège social déclaré. La seconde
 * reprend mot pour mot les mentions légales, afin que les données
 * structurées et la page légale ne se contredisent pas.
 */
export const ADRESSES = [
  {
    "@type": "PostalAddress",
    addressLocality: "Le Mans",
    postalCode: "72000",
    addressRegion: "Sarthe",
    addressCountry: "FR",
  },
  {
    "@type": "PostalAddress",
    streetAddress: "58 rue de Ponthieu, Bureau 326",
    addressLocality: "Paris",
    postalCode: "75008",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
];

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

/**
 * Parmi les `competences` d'un projet, « Développé avec l'IA » n'est pas un
 * outil mais une façon de travailler : le tag reçoit un style à part.
 * La comparaison neutralise la variante d'apostrophe (droite ou courbe)
 * utilisée dans les fichiers de contenu.
 */
const APOSTROPHE_COURBE = String.fromCharCode(0x2019);

export function estTagIA(tag: string): boolean {
  return (
    tag.split(APOSTROPHE_COURBE).join("'").toLocaleLowerCase("fr") ===
    "développé avec l'ia"
  );
}

/**
 * Coupe un texte pour une meta description, sans casser de mot.
 *
 * Une simple troncature à 155 caractères laissait des fins comme
 * « …et réseaux sociaux. Bientôt pr ». On recule jusqu'au dernier espace et
 * on marque la coupe par une ellipse.
 */
export function descriptionCourte(texte: string, max = 155): string {
  if (texte.length <= max) return texte;
  const coupe = texte.slice(0, max - 1);
  const espace = coupe.lastIndexOf(" ");
  return (espace > 0 ? coupe.slice(0, espace) : coupe).replace(/[,;:.\s]+$/, "") + "…";
}
