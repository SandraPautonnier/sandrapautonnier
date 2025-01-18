import React, { useState } from "react";
import { Link } from "react-router-dom";
import workslist from "../../assets/content/worksList.json";

const Works = () => {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCard, setExpandedCard] = useState(null); // Gère l'état d'affichage des descriptions.

  // Liste des catégories uniques
  const categories = ["All", ...new Set(workslist.map((work) => work.category))];

  // Filtrer les projets en fonction de la catégorie sélectionnée
  const filteredWorks =
    selectedCategory === "All"
      ? workslist
      : workslist.filter((work) => work.category === selectedCategory);

  // Gestion de l'ouverture/fermeture des descriptions
  const toggleDescription = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section className="works">
      <h2>Mes projets</h2>
      {/* Menu déroulant pour sélectionner une catégorie */}
      <div className="filter">
        <label htmlFor="category-select">Filtrer par catégorie :</label>
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
        {
          filteredWorks.map((works) => (
            <div className="card-works" key={works.id}>
              <Link to={works.link}>
              <img src={`${works.cover}`} alt={`${works.description}`} />
              <h3>{works.titlework}</h3>
              
              {/* Description repliable */}
              <div className="description-collapse">
                <button
                  className="collapse-button"
                  onClick={() => toggleDescription(works.id)}
                >
                  {expandedCard === works.id ? "Voir moins" : "Voir plus"}
                </button>
                {expandedCard === works.id && (
                  <p className="description-text">{works.description}</p>
                )}
              </div>
              </Link>
              
              
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default Works;
