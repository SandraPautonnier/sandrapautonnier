import React, { useState, useEffect } from "react";

function ToggleMode() {

    const [isDarkMode, setIsDarkMode] = useState(
        () => localStorage.getItem("mode") === "dark"
      );

    // Appliquer le thème au body lors d'un changement
    useEffect(() => {
        document.body.className = isDarkMode ? "dark-mode" : "light-mode";
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    // Fonction pour basculer le mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button onClick={toggleTheme} style={{ cursor: "pointer", padding: "10px" }}>
      {isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
    </button>
  )
}

export default ToggleMode;