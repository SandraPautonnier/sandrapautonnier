import { Link } from "react-router-dom";
import workslist from "../../assets/content/worksList.json";
import { resolveCover } from "../../assets/content/portfolioCovers";

const Works = ({ projectType }) => {
  // Filtrer par type si fourni, sinon afficher tous
  const worksByType = projectType
    ? workslist.filter((work) => work.type === projectType)
    : workslist;

  // Si pas de projectType (page home), afficher que les 3 derniers
  const worksList = !projectType ? worksByType.slice(-3) : worksByType;

  const handleProjectClick = () => {
    // Sauvegarder la position du scroll actuelle
    localStorage.setItem('portfolioScrollPosition', window.scrollY);
    window.scrollTo(0, 0);
  };

  return (
    <section className="works" id="portfolio" aria-label="Liste des projets">
      <div className="container-card-works">
        {worksList.map((works) => (
          <div className="card-works" key={works.id}>
            <img src={resolveCover(works.cover)} alt={`Projet ${works.titlework}`} loading="lazy" />
            <div className="card-content">
              <div>
                <h3>{works.titlework}</h3>
                <p className="work-category">{works.category}</p>
              </div>
              <Link to={`/portfolio/${works.id}`} className="btn-secondary" onClick={handleProjectClick}>
                Voir le projet
              </Link>
            </div>
            </div>
        ))}
      </div>
    </section>
  );
};

export default Works;
