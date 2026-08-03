import Carousel from "../../features/Carousel";

/**
 * Îlot du carrousel de l'accueil.
 *
 * Le composant Carousel attend ses slides via `children` et les découpe avec
 * React.Children.toArray : passer par un slot Astro ne fournirait qu'un seul
 * bloc et casserait la pagination. Cet îlot reçoit donc les projets en prop
 * sérialisable et construit les slides côté React, en reproduisant exactement
 * le balisage de l'ancienne page Home.
 */
const ProjectsCarousel = ({ projets }) => (
  <Carousel>
    {projets.map((item) => (
      <div className="slide-content" key={item.slug}>
        <img src={item.cover} alt={`Projet ${item.titre}`} loading="lazy" />
        <div className="slide-description">
          <div>
            <h3>{item.titre}</h3>
            <span className="work-language">{item.category}</span>
          </div>
          <a href={`/realisations/${item.slug}/`} className="btn-secondary" aria-label={`Voir le projet ${item.titre}`}>
            Voir le projet
          </a>
        </div>
      </div>
    ))}
  </Carousel>
);

export default ProjectsCarousel;
