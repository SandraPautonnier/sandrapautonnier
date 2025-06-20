import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BgDark from "../../assets/images/Background-image-dark.webp";
import BgLight from "../../assets/images/Background-image-light.webp";
import useThemeStore from "../../store/useThemeStore";
import ContactModal from "../../components/ContactModal";

const Legalnotice = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div
      className="background-image"
      style={{
        background: `url(${
          isDarkMode ? BgDark : BgLight
        }) no-repeat center/cover`,
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <div className="background-color">
        <div className="header-main">
          <header>
            <Navbar openModal={openModal} />
          </header>
          <main>
            <h2>Mentions légales et conditions d’utilisations</h2>
            <p>
              Sandra Pautonnier, soucieuse des droits des individus, notamment
              au regard des traitements automatisés et dans une volonté de
              transparence avec ses clients, a mis en place une politique
              reprenant l’ensemble de ces traitements, des finalités poursuivies
              par ces derniers ainsi que des moyens d’actions à la disposition
              des individus afin qu’ils puissent au mieux exercer leurs droits.
              <br />
              Pour toute information complémentaire sur la protection des
              données personnelles, nous vous invitons à consulter le site :{" "}
              <a href="http://www.cnil.fr">http://www.cnil.fr</a>.
            </p>
            <p>
              La poursuite de la navigation sur ce site vaut acceptation sans
              réserve des dispositions et conditions d’utilisation qui suivent.
              La version actuellement en ligne de ces conditions d’utilisation
              est la seule opposable pendant toute la durée d’utilisation du
              site et jusqu’à ce qu’une nouvelle version la remplace.
            </p>
            <h2>Article 1 – Mentions Légales</h2>
            <p>
              En vertu de l’article 6 de la loi n°2004-575 du 21 juin 2004 pour
              la confiance dans l’économie numérique, il est précisé aux
              utilisateurs du site internet{" "}
              <a href="https://sandrapautonnier.com/">
                https://sandrapautonnier.com/
              </a>{" "}
              l’identité des différents intervenants dans le cadre de sa
              réalisation et de son suivi :
            </p>
            <h3>1.1 Editeur (ci-après « l’éditeur ») :</h3>
            <p>
              Sandra Pautonnier est le responsable publication et est une
              personne physique.
              <br />
              Située : 72000 Le Mans
              <br />
              Adresse mail : contact@sandrapautonnier.com
            </p>
            <h3>1.2 Webmaster (ci-après « le webmaster ») :</h3>
            <p>
              Sandra Pautonnier
              <br />
              Adresse mail : contact@sandrapautonnier.com
            </p>
            <h3>1.3 Hébergeur (ci-après « l’hébergeur ») :</h3>
            <p>
              <a href="https://sandrapautonnier.com/">
                https://sandrapautonnier.com/
              </a>{" "}
              est hébergé par OVH, dont le siège social est situé 2 rue
              Kellermann 59100 Roubaix – France.
            </p>
            <h2>Article 2 – Accès au site</h2>
            <p>
              L’accès au site et son utilisation sont réservés à un usage
              strictement personnel. Vous vous engagez à ne pas utiliser ce site
              et les informations ou données qui y figurent à des fins
              commerciales, politiques, publicitaires et pour toute forme de
              sollicitation commerciale et notamment l’envoi de courriers
              électroniques non sollicités.
            </p>
            <h2>Article 3 – Contenu du site</h2>
            <p>
              Le Site constitue une œuvre de l’esprit protégée par les
              dispositions du Code de la Propriété Intellectuelle et des
              Réglementations Internationales applicables. Toutes les marques,
              photographies, textes, commentaires, illustrations, images animées
              ou non, séquences vidéo, sons, ainsi que toutes les applications
              informatiques qui pourraient être utilisées pour faire fonctionner
              ce site et plus généralement tous les éléments reproduits ou
              utilisés sur le site sont protégés par les lois en vigueur au
              titre de la propriété intellectuelle.
            </p>
            <h2>Article 4 – Gestion du site</h2>
            <p>
              Ce site internet est normalement accessible à tout moment aux
              utilisateurs. Pour la bonne gestion du site, l’éditeur pourra à
              tout moment :
              <ul>
                <li>
                  Suspendre, interrompre ou limiter l’accès à tout ou partie du
                  site.
                </li>
                <li>
                  Supprimer toute information pouvant en perturber le
                  fonctionnement ou entrant en contravention avec les lois
                  nationales ou internationales.
                </li>
                <li>Suspendre le site afin de procéder à des mises à jour.</li>
              </ul>
            </p>
            <h2>Article 5 – Responsabilités</h2>
            <p>
              La responsabilité de l’éditeur ne peut être engagée en cas de
              défaillance, panne, difficulté ou interruption de fonctionnement,
              empêchant l’accès au site ou à une de ses fonctionnalités. Le
              matériel de connexion au site que vous utilisez est sous votre
              entière responsabilité. Vous devez prendre toutes les mesures
              appropriées pour protéger votre matériel et vos propres données
              notamment d’attaques virales par Internet. Vous êtes par ailleurs
              seul responsable des sites et données que vous consultez.
            </p>
            <p>
              L’éditeur ne pourra être tenu responsable en cas de poursuites
              judiciaire à votre encontre :<br />
              <ul>
                <li>
                  du fait de l’usage du site ou de tout service accessible via
                  Internet ;
                </li>
                <li>
                  du fait du non-respect par vous des présentes conditions
                  générales.
                </li>
              </ul>
            </p>
            <p>
              L’éditeur n’est pas responsable des dommages causés par vous-même,
              à des tiers et/ou à votre équipement du fait de votre connexion ou
              de votre utilisation du site et vous renoncez à toute action
              contre lui de ce fait. Si l’éditeur venait à faire l’objet d’une
              procédure amiable ou judiciaire en raison de votre utilisation du
              site, il pourra se retourner contre vous pour obtenir
              l’indemnisation de tous les préjudices, sommes, condamnations et
              frais pourraient découler de cette procédure.
            </p>
            <h2>Article 6 – Liens hypertextes</h2>
            <p>
              La mise en place par les utilisateurs de tous liens hypertextes
              vers tout ou partie du site est autorisée par l’éditeur. Tout lien
              devra être retiré sur simple demande de l’éditeur. Toute
              information accessible via un lien vers d’autres sites n’est pas
              publiée par l’éditeur. L’éditeur ne dispose d’aucun droit sur le
              contenu présent dans ledit lien.
            </p>
            <h2>Article 7 – Collecte et protection des données</h2>
            <p>
              Vos données sont collectées par : Sandra Pautonnier. Une donnée à
              caractère personnel désigne toute information concernant une
              personne physique identifiée ou identifiable (personne concernée)
              ; est réputée identifiable une personne qui peut être identifiée,
              directement ou indirectement, notamment par référence à un nom, un
              numéro d’identification ou à plusieurs éléments spécifiques,
              propres à son identité physique, physiologique, génétique,
              psychique, économique, culturelle ou sociale. Les informations
              personnelles pouvant être recueillies sur le site sont
              principalement utilisées par l’éditeur pour la gestion des
              relations avec vous, et le cas échéant pour le traitement de vos
              commandes.
            </p>
            <p>
              Les données personnelles collectées sont les suivantes : nom,
              prénom, adresse postale, adresse mail, numéro de téléphone.
            </p>
            <p>
              Par ailleurs{" "}
              <a href="https://sandrapautonnier.com/">
                https://sandrapautonnier.com/
              </a>{" "}
              ne collecte aucune « données sensibles ».
            </p>
            <h2>
              Article 8 – Conservation des données et Droit d’accès, de
              rectification et de référencement de vos données
            </h2>
            <p>
              Le site internet conserve vos données pour la durée nécessaire
              pour vous fournir des services ou son assistance. Dans la mesure
              raisonnablement nécessaire ou requise pour satisfaire aux
              obligations légales ou réglementaires, régler des litiges,
              empêcher les fraudes et abus ou appliquer nos modalités et
              conditions, nous pouvons également conserver certaines
              informations si nécessaire, même si nous n’en n’avons plus besoin
              pour vous fournir nos services.
            </p>
            <p>
              Toutefois, les données sont conservées et utilisées pour une durée
              conforme à la législation en vigueur et en application de la
              réglementation applicable aux données à caractère personnel, les
              utilisateurs disposent des droits suivants :<br />
              <ul>
                <li>
                  le droit d’accès : ils peuvent exercer leur droit d’accès,
                  pour connaître les données personnelles les concernant, en
                  écrivant à l’adresse électronique ci-dessous mentionnée. Dans
                  ce cas, avant la mise en œuvre de ce droit, le site internet
                  peut demander une preuve de l’identité de l’utilisateur afin
                  d’en vérifier l’exactitude ;
                </li>
                <li>
                  le droit rectification : si les données à caractère personnel
                  détenues par le site internet sont inexactes, ils peuvent
                  demander la mise à jour des informations ;
                </li>
                <li>
                  le droit de suppression aux données : les utilisateurs peuvent
                  demander la suppression de leurs données à caractère
                  personnel, conformément aux lois applicables en matière de
                  protection des données ;
                </li>
                <li>
                  le droit à la limitation du traitement : les utilisateurs
                  peuvent demander au site internet de limiter le traitement des
                  données personnelles conformément aux hypothèses prévues par
                  le RGPD ;
                </li>
                <li>
                  le droit de s’opposer au traitement des données : les
                  utilisateurs peuvent s’opposer à ce que leurs données soient
                  traitées conformément aux hypothèses prévues par le RGPD ;
                </li>
                <li>
                  le droit à la portabilité : ils peuvent réclamer que le site
                  internet leur remette les données personnelles qu’ils ont
                  fournies pour les transmettre à une nouvelle plateforme.
                </li>
              </ul>
            </p>
            <p>
              Vous pouvez exercer vos droits en nous contactant, à l’adresse
              mail suivante : contact@sandrapautonnier.com.
            </p>
            <p>
              Toute demande doit être accompagnée de la photocopie d’un titre
              d’identité en cours de validité signé et faisant mention de
              l’adresse postale ou de l’adresse mail à laquelle l’éditeur pourra
              contacter le demandeur. La réponse sera adressée le mois suivant
              la réception de la demande. Ce délai d’un peut être prolongé de
              deux mois si la complexité de la demande et/ou le nombre de
              demandes l’exigent.
            </p>
            <p>
              De plus, et depuis la loi n°2016-1321 du 7 octobre 2016, les
              personnes qui le souhaitent, ont la possibilité d’organiser le
              sort de leurs données après leur décès. Pour plus d’information
              sur le sujet, vous pouvez consulter le site Internet de la CNIL :{" "}
              <a href="https://www.cnil.fr/">https://www.cnil.fr/</a>.
            </p>
            <p>
              Même si les utilisateurs peuvent introduire une réclamation à la
              CNIL : <a href="https://www.cnil.fr/">https://www.cnil.fr/</a>.
              Nous préférons d’abord être contacter. D’ailleurs, quelques soient
              les problèmes qu’un utilisateur rencontrerait avec ses données
              personnelles, nous sommes à leur entière disposition, à l’adresse
              mail suivante : contact@sandrapautonnier.com.
            </p>
            <h2>Article 9 – Utilisation des données</h2>
            <p>
              Les données personnelles collectées auprès des utilisateurs ont
              pour objectif la mise à disposition des services du site internet,
              leur amélioration et le maintien d’un environnement sécurisé. La
              base légale des traitements est l’exécution du contrat entre
              l’utilisateur et le site internet. Plus précisément, les
              utilisations sont les suivants :<br />
              <ul>
                <li>accès et utilisation du site internet ;</li>
                <li>
                  gestion du fonctionnement et optimisation du site internet ;
                </li>
                <li>mise en œuvre d’une assistance utilisateurs ;</li>
                <li>
                  vérification, identification et authentification des données
                  transmises par l’utilisateur ;
                </li>
                <li>
                  prévention et détection des fraudes, logiciels malveillants et
                  gestion des incidents de sécurité ;
                </li>
                <li>gestion des éventuels litiges avec les utilisateurs ;</li>
                <li>
                  envoi d’informations commerciales et publicitaires (enquête de
                  satisfaction, campagnes de communication).
                </li>
              </ul>
            </p>
            <h2>
              Article 10 – Partage des données personnelles avec des tiers
            </h2>
            <p>
              <a href="https://sandrapautonnier.com/">
                https://sandrapautonnier.com/
              </a>{" "}
              s’interdit de traiter, héberger ou transférer les Informations
              collectées sur ses Clients vers un pays situé en dehors de l’Union
              européenne ou reconnu comme « non adéquat » par la Commission
              européenne sans en informer préalablement le client. Pour autant,
              le site internet reste libre du choix de ses sous-traitants
              techniques et commerciaux à la condition qu’ils présentent les
              garanties suffisantes au regard des exigences du Règlement Général
              sur la Protection des Données. Le site internet s’engage à prendre
              toutes les précautions nécessaires afin de préserver la sécurité
              des Informations et notamment qu’elles ne soient pas communiquées
              à des personnes non autorisées.
            </p>
            <p>
              Cependant, si un incident impactant l’intégrité ou la
              confidentialité des Informations du Client est portée à la
              connaissance de{" "}
              <a href="https://sandrapautonnier.com/">
                https://sandrapautonnier.com/
              </a>
              , celle-ci devra dans les meilleurs délais informer le Client et
              lui communiquer les mesures de corrections prises. Les Données
              Personnelles de l’Utilisateur peuvent être traitées par des
              filiales de{" "}
              <a href="https://sandrapautonnier.com/">
                https://sandrapautonnier.com/
              </a>{" "}
              et des sous-traitants (prestataires de services), exclusivement
              afin de réaliser les finalités de la présente politique.
            </p>
            <h2>Article 11 – Sécurité des données personnelles</h2>
            <p>
              Quels que soient les efforts fournis, aucune méthode de
              transmission sur Internet et aucune méthode de stockage
              électronique n'est complètement sûre. Nous ne pouvons en
              conséquence pas garantir une sécurité absolue.
            </p>
            <p>
              Si nous prenions connaissance d'une brèche de la sécurité, nous
              avertirions les utilisateurs concernés afin qu'ils puissent
              prendre les mesures appropriées. Nos procédures de notification
              d’incident tiennent compte de nos obligations légales, qu'elles se
              situent au niveau national ou européen. Nous nous engageons à
              informer pleinement nos clients de toutes les questions relevant
              de la sécurité de leur compte et à leur fournir toutes les
              informations nécessaires pour les aider à respecter leurs propres
              obligations réglementaires en matière de reporting.
            </p>
            <p>
              Aucune information personnelle de l'utilisateur du site{" "}
              <a href="https://sandrapautonnier.com/">
                https://sandrapautonnier.com/
              </a>{" "}
              n'est publiée à l'insu de l'utilisateur, échangée, transférée,
              cédée ou vendue sur un support quelconque à des tiers. Seule
              l'hypothèse du rachat de{" "}
              <a href="https://sandrapautonnier.com/">
                https://sandrapautonnier.com/
              </a>{" "}
              et de ses droits permettrait la transmission des dites
              informations à l'éventuel acquéreur qui serait à son tour tenu de
              la même obligation de conservation et de modification des données
              vis à vis de l'utilisateur du site{" "}
              <a href="https://sandrapautonnier.com/">
                https://sandrapautonnier.com/
              </a>
              .
            </p>
            <p>
              Si lors de la consultation du site, vous accédez à des données à
              caractère personnel, vous devez vous abstenir de toute collecte,
              de toute utilisation non autorisée et de tout acte pouvant
              constituer une atteinte à la vie privée ou à la réputation des
              personnes. L’éditeur décline toute responsabilité à cet égard.
            </p>
            <h2>Article 12 – Offres commerciales</h2>
            <p>
              Vous êtes susceptible de recevoir des offres commerciales de
              l’éditeur ; d’ailleurs, vos données sont susceptibles d’être
              utilisées par les partenaires de l’éditeur à des fins de
              prospection commerciale. Si vous ne le souhaitez pas veuillez nous
              contacter à l’adresse mail suivante :
              contact@sandrapautonnier.com.
            </p>
            <h2>Article 13 – Cookies</h2>
            <p>
              Un « cookie » est un petit fichier d’information envoyé sur le
              navigateur de l’Utilisateur et enregistré au sein du terminal de
              l’Utilisateur (ex : ordinateur, smartphone), (ci-après « Cookies
              »). Ce fichier comprend des informations telles que le nom de
              domaine de l’Utilisateur, le fournisseur d’accès Internet de
              l’Utilisateur, le système d’exploitation de l’utilisateur, ainsi
              que la date et l’heure d’accès. Les Cookies ne risquent en aucun
              cas d’endommager le terminal de l’utilisateur.
              <br />
              https://sandrapautonnier.com/ est susceptible de traiter les
              informations de l’utilisateur concernant sa visite du site, telles
              que les pages consultées, les recherches effectuées. Ces
              informations permettent à https://sandrapautonnier.com/
              d’améliorer le contenu du Site, de la navigation de l’utilisateur.
            </p>
            <p>
              Les Cookies facilitant la navigation et/ou la fourniture des
              services proposés par le Site, l’utilisateur peut configurer son
              navigateur pour qu’il lui permette de décider s’il souhaite ou non
              les accepter de manière à ce que des Cookies soient enregistrés
              dans le terminal ou, au contraire, qu’ils soient rejetés, soit
              systématiquement, soit selon leur émetteur. L’utilisateur peut
              également configurer son logiciel de navigation de manière à ce
              que l’acceptation ou le refus des Cookies lui soient proposés
              ponctuellement, avant qu’un cookie soit susceptible d’être
              enregistré dans son terminal.
            </p>
            <p>
              Ainsi, le fonctionnement de notre site Internet passe par des
              cookies de navigation.
            </p>
            <p>
              Les cookies strictement nécessaires suivants sont utilisés sur
              notre site Web:
              <br />
              <table>
                <thead>
                  <tr>
                    <th>Site</th>
                    <th>Nom</th>
                    <th>Gestion</th>
                    <th>Objet du cookies</th>
                    <th>Durée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Destock</td>
                    <td>1P_JAR</td>
                    <td>.google.fr</td>
                    <td>Analytical cookies</td>
                    <td>5 min</td>
                  </tr>
                  <tr>
                    <td>Mobile</td>
                    <td>CONSENT</td>
                    <td>.google.fr</td>
                    <td>Analytical cookies</td>
                    <td>Max. 20 ans</td>
                  </tr>
                </tbody>
              </table>
              Votre consentement n’est pas requis pour ces cookies. Il n’est
              donc pas possible de les activer ou désactiver individuellement.
            </p>
            <p>
              Pour plus d’informations sur l’utilisation, la gestion et la
              suppression des « cookies », pour tout type de navigateur, nous
              vous invitons à consulter le lien suivant :{" "}
              <a href="https://www.cnil.fr/cookies-les-outils-pour-les-maitriser">
                https://www.cnil.fr/cookies-les-outils-pour-les-maitriser
              </a>
              .
            </p>
            <h2>Article 14 – Loi applicable</h2>
            <p>
              Les présentes conditions d’utilisation du site sont régies par la
              loi française et soumises à la compétence des tribunaux du siège
              social de l’éditeur.
            </p>
            <p>
              Loi n° 92-597 du 1er juillet 1992 relative au code de la propriété
              intellectuelle.
              <br />
              Loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie
              numérique.
              <br />
              Loi n°2016-1321 du 7 octobre 2016 pour une République numérique.
              <br />
              Loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux
              fichiers et aux libertés.
              <br />
              Loi n° 2018-493 du 20 juin 2018 relative à la protection des
              données personnelles (Règlement général sur la protection des
              données).
            </p>
            <h2>Article 15 – Contactez-moi</h2>
            <p>
              Pour toute question, information sur les services présentés sur le
              site, ou concernant le site lui-même, vous pouvez laisser un
              message à l’adresse mail suivante :<br />
              contact@sandrapautonnier.com.
            </p>
          </main>
        </div>
        <Footer openModal={openModal} />
        <ContactModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Contactez-moi"
        />
      </div>
    </div>
  );
};

export default Legalnotice;
