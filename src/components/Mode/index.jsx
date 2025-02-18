import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function ToggleMode() {

    const [isDarkMode, setIsDarkMode] = useState(
        () => localStorage.getItem("mode") === "dark"
      );

    // Appliquer le thème au body lors d'un changement
    useEffect(() => {
        document.body.className = isDarkMode ? "light-mode" : "dark-mode";
        localStorage.setItem("theme", isDarkMode ? "light" : "dark");
    }, [isDarkMode]);

    // Fonction pour basculer le mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button onClick={toggleTheme} className="toggle-button" style={{ cursor: "pointer", padding: "7px" }}>
      {isDarkMode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
    </button>
  )
}

export default ToggleMode;