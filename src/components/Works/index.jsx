import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
} from "@fortawesome/free-solid-svg-icons";
import workslist from "../../assets/content/worksList.json";

const Works = ({ projectType }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCard, setExpandedCard] = useState(null); 

  // Filtrer par type si fourni, sinon afficher tous
  const worksByType = projectType 
    ? workslist.filter((work) => work.type === projectType)
    : workslist;

  // Si pas de projectType (page home), afficher que les 3 derniers
  const worksList = !projectType ? worksByType.slice(-3) : worksByType;

  const categories = [
    "All",
    ...new Set(worksList.map((work) => work.category)),
  ];

  const filteredWorks =
    selectedCategory === "All"
      ? worksList
      : worksList.filter((work) => work.category === selectedCategory);

  const toggleDescription = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleProjectClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="works" id="portfolio">
      {/* Menu déroulant pour sélectionner une catégorie */}
      <div className="filter">
        <label htmlFor="category-select">Filtrer par catégorie : </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option value={category} key={index}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="container-card-works">
        {filteredWorks.map((works) => (
          <div className="card-works" key={works.id}>
            <img src={`${works.cover}`} alt={`${works.description}`} />
            <h3>{works.titlework}</h3>
            <span className="work-language">{works.language}</span>
            <span className="work-tools">{works.tools}</span>
            {/* Description repliable */}
            <div className="description-collapse">
              <button
                className="collapse-button"
                onClick={() => toggleDescription(works.id)}
              >
                <FontAwesomeIcon
                  icon={
                    expandedCard === works.id
                      ? faDownLeftAndUpRightToCenter
                      : faUpRightAndDownLeftFromCenter
                  }
                />
              </button>
              <div
                className={`description-text ${
                  expandedCard === works.id ? "open" : "closed"
                }`}
              >
                <p>{works.description}</p>
              </div>
            </div>
            <Link to={`/portfolio/${works.id}`} className="project-link-button" onClick={handleProjectClick}>
              Voir le projet
            </Link>
            </div>
        ))}
      </div>
    </section>
  );
};

export default Works;
