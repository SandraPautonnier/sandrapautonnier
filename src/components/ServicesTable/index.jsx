import React from "react";

export default function ServicesTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Offre</th>
          <th>One Page</th>
          <th>3 Pages</th>
          <th>E-commerce</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Prix création</td>
          <td>390 €</td>
          <td>690 €</td>
          <td>1 790 €</td>
        </tr>
        <tr>
          <td>Forfait mensuel</td>
          <td>29 €/mois</td>
          <td>39 €/mois</td>
          <td>89 €/mois</td>
        </tr>
        <tr>
          <td>Pages incluses</td>
          <td>1 page</td>
          <td>3 pages</td>
          <td>Boutique complète</td>
        </tr>
        <tr>
          <td>Responsive</td>
          <td>Oui</td>
          <td>Oui</td>
          <td>Oui</td>
        </tr>
        <tr>
          <td>Formulaire de contact</td>
          <td>Option (+90 €)</td>
          <td>Inclus</td>
          <td>Inclus</td>
        </tr>
        <tr>
          <td>SSL (site sécurisé)</td>
          <td>Oui</td>
          <td>Oui</td>
          <td>Oui</td>
        </tr>
        <tr>
          <td>Hébergement inclus</td>
          <td>Oui</td>
          <td>Oui</td>
          <td>Oui</td>
        </tr>
        <tr>
          <td>Sauvegardes</td>
          <td>Automatiques</td>
          <td>Automatiques</td>
          <td>Quotidiennes</td>
        </tr>
        <tr>
          <td>Mises à jour</td>
          <td>Techniques</td>
          <td>Techniques</td>
          <td>Complètes</td>
        </tr>
        <tr>
          <td>Surveillance sécurité</td>
          <td>Oui</td>
          <td>Oui</td>
          <td>Renforcée</td>
        </tr>
        <tr>
          <td>Options</td>
          <td>Formulaire : +90 €</td>
          <td>
            Page : +120 €/page
            <br />
            Formulaire : +30 €
          </td>
          <td>Produits supplémentaires : sur devis</td>
        </tr>
        <tr>
          <td>Inclus spécifique</td>
          <td>—</td>
          <td>—</td>
          <td>
            Jusqu’à 20 produits
            <br />
            Formation incluse
          </td>
        </tr>
      </tbody>
    </table>
  );
}