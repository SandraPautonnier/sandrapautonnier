import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);


  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? children.length - 1 : prev - 1));
  const nextSlide = () => setCurrentIndex((prev) => (prev === children.length - 1 ? 0 : prev + 1));

  return (
    <div className="carousel">
      <div 
        className="carousel-container" 
        style={{ transform: `translateX(-${currentIndex * 100}%)`, 
        display: "flex",
        transition: "transform 0.5s ease-in-out" }}
      >
        {children.map((child, index) => (
          <div key={index} className="carousel-slide">
            {child}
          </div>
        ))}
      </div>

      {/* Boutons de navigation */}
      <button onClick={prevSlide} className="carousel-button left" aria-label="Bouton de navigation précèdent">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button onClick={nextSlide} className="carousel-button right" aria-label="Bouton de navigation suivant">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      {/* Indicateurs */}
      <div className="carousel-indicators">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            aria-label="Bouton d'indication'"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;