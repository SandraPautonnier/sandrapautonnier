import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import useThemeStore from "../../store/useThemeStore";

function ToggleMode() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="toggle-button"
      aria-label="Bouton du mode clair ou sombre"
    >
      {isDarkMode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
    </button>
  );
}

export default ToggleMode;
