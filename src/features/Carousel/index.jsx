import { useState } from "react";

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = children.length;

  // Navigation
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
  const nextSlide = () => setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1));

  return (
    <div className="carousel">
      <div className="carousel-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {children.map((child, index) => (
          <div key={index} className="carousel-slide">
            {child}
          </div>
        ))}
      </div>

      {/* Boutons de navigation */}
      <button onClick={prevSlide} className="carousel-button left">←</button>
      <button onClick={nextSlide} className="carousel-button right">→</button>

      {/* Indicateurs */}
      <div className="carousel-indicators">
        {children.map((_, index) => (
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
