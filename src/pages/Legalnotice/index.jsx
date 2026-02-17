import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Legalnotice = () => {

  return (
    <div className="legalnotice">
      <div className="background-color">
        <div className="header-main">
          <header>
            <Navbar/>
          </header>
          <main>
            <h1>Mentions légales</h1>

            <h2>1. Éditeur du site</h2>
            <p>
              Le présent site, accessible à l’adresse https://sandrapautonnier.com, 
              est édité par :
            </p>
            <p>
              <strong>Sandra Pautonnier</strong>, Entrepreneur individuel (micro-entreprise)<br />
              Nom commercial : Sukiweb<br />
              SIRET : 88320435600033<br />
              Code APE : 6201Z<br />
              Siège social : 59 RUE de Ponthieu, Bureau 326, 75008 Paris, France<br />
              Email : contact@sandrapautonnier.com
            </p>
            <p>
              Directeur de la publication : Sandra Pautonnier
            </p>

            <h2>2. Hébergement</h2>
            <p>
              Le site est hébergé par 
              <strong> Hostinger International Ltd</strong><br />
              61 Lordou Vironos Street, 6023 Larnaca, Chypre<br />
              Site web : https://www.hostinger.fr
            </p>

            <h2>3. Propriété intellectuelle</h2>
            <p>
              L’ensemble des éléments constituant le site (textes, images, photographies, 
              graphismes, logo, icônes, vidéos, éléments visuels, structure, code source, 
              développement, architecture, design, bases de données et tout autre contenu) 
              sont protégés par le droit de la propriété intellectuelle.
            </p>
            <p>
              Sauf mention contraire, ces éléments sont la propriété exclusive de 
              Sukiweb - Sandra Pautonnier.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, transmission, 
              dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé 
              que ce soit, sans autorisation écrite préalable est interdite et constitue une 
              contrefaçon susceptible d’engager la responsabilité civile et pénale de son auteur.
            </p>
            <p>
              Toute utilisation non autorisée du site ou de l’un quelconque de ses éléments 
              pourra faire l’objet de poursuites conformément aux dispositions du 
              Code de la propriété intellectuelle.
            </p>

            <h2>4. Responsabilité</h2>
            <p>
              L’éditeur s’efforce de fournir des informations exactes et à jour. 
              Toutefois, il ne saurait être tenu responsable des omissions, inexactitudes 
              ou défauts de mise à jour.
            </p>

            <h2>5. Données personnelles</h2>
            <p>
              Les données collectées via le formulaire de contact sont utilisées uniquement 
              dans le cadre des échanges professionnels.
            </p>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), 
              vous disposez d’un droit d’accès, de rectification, d’effacement et 
              d’opposition concernant vos données personnelles.
            </p>
            <p>
              Pour exercer ces droits : contact@sandrapautonnier.com
            </p>

            <h2>6. Cookies</h2>
            <p>
              Le site peut utiliser des cookies à des fins de fonctionnement et de 
              mesure d’audience. L’utilisateur peut configurer son navigateur pour les refuser.
            </p>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Legalnotice;
