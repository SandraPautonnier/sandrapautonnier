import React, { useState } from "react";
import { Link } from "react-router-dom";
import workslist from "../../assets/content/worksList.json";
import Dropdown from "../Dropdown";

const Works = ({ projectType }) => {
  const [selectedCategory, setSelectedCategory] = useState("-- Tous les projets --"); 

  // Filtrer par type si fourni, sinon afficher tous
  const worksByType = projectType 
    ? workslist.filter((work) => work.type === projectType)
    : workslist;

  // Si pas de projectType (page home), afficher que les 3 derniers
  const worksList = !projectType ? worksByType.slice(-3) : worksByType;

  const categories = [
    "-- Tous les projets --",
    ...new Set(worksList.map((work) => work.category)),
  ];

  const filteredWorks =
    selectedCategory === "-- Tous les projets --"
      ? worksList
      : worksList.filter((work) => work.category === selectedCategory);

  const handleProjectClick = () => {
    // Sauvegarder la position du scroll actuelle
    localStorage.setItem('portfolioScrollPosition', window.scrollY);
    window.scrollTo(0, 0);
  };

  return (
    <section className="works" id="portfolio">
      {/* Dropdown pour sélectionner une catégorie */}
      <Dropdown 
        title="Filtrer par catégorie" 
        content={categories}
        onSelectItem={(category) => setSelectedCategory(category)}
      />
      <div className="container-card-works">
        {filteredWorks.map((works) => (
          <div className="card-works" key={works.id}>
            <img src={`${works.cover}`} alt={`${works.description}`} />
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
