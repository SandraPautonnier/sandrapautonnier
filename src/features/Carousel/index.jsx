import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Carousel = ({ children }) => {
  const slides = React.Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <div className="carousel">
      <div className="carousel-viewport">
        <div 
          className="carousel-container"
          style={{ transform: `translateX(-${currentIndex * 100}%)`,
            display: "flex",
            transition: "transform 0.5s ease-in-out"
          }}
        >
          {slides.map((child, index) => (
            <div key={index} className="carousel-slide">
              {child}
            </div>
          ))}
        </div>
      </div>

      <button onClick={prevSlide} className="carousel-button left">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <button onClick={nextSlide} className="carousel-button right">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
