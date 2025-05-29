import React from 'react';

const Tarifaire = () => {
  const prestations = [
    {
      nom: "🖥️ Site vitrine mini",
      details: "1 à 3 pages, responsive, SEO de base inclus",
      tarif: "350 €"
    },
    {
      nom: "🖥️ Site vitrine standard",
      details: "4 à 6 pages, responsive, SEO de base inclus",
      tarif: "700 €"
    },
    {
      nom: "🛒 Boutique en ligne simple",
      details: "Jusqu’à 10 produits, panier + paiement, SEO de base inclus",
      tarif: "990 €"
    },
    {
      nom: "🧪 Audit SEO complet",
      details: "Analyse technique, mots-clés, contenu, recommandations",
      tarif: "300 €"
    },
    {
      nom: "🛠️ Maintenance mensuelle",
      details: "Mises à jour, sécurité, support, petit correctif inclus",
      tarif: "30 €/mois"
    },
    {
      nom: "🛠️ Maintenance ponctuelle",
      details: "Corrections ou interventions spécifiques",
      tarif: "50 € / intervention"
    },
    {
      nom: "➕ Page supplémentaire",
      details: "Ajout d’une page avec design et intégration responsive",
      tarif: "60 € / page"
    },
    {
      nom: "⚙️ Fonctionnalité supplémentaire",
      details: "Blog, formulaire avancé, carrousel, galerie, carte interactive, etc.",
      tarif: "120 € à 250 €"
    }
  ];

  return (
    <section>
      <h2>Grille tarifaire</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Prestation</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Détails</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Tarif de base</th>
          </tr>
        </thead>
        <tbody>
          {prestations.map(({ nom, details, tarif }) => (
            <tr key={nom}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{nom}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{details}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{tarif}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Tarifaire;
