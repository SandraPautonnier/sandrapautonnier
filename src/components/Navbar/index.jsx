import React, { useState } from "react";
import ContactModal from "../ContactModal";

const Navbar = ({ openModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  

  return (
    <nav>
      {/*<h2>SP</h2>*/}
      {/*Bouton hamburger*/}
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? (
          <span className="close-nav">&times;</span>
        ) : (
          <>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </>
        )}
      </div>
      {/*Menu de nav*/}
      <ul className={`nav-ul ${menuOpen ? 'open' : ''}`}>
        <li className="nav-li">
          <a href="#home" onClick={() => setMenuOpen(false)}>ACCEUIL</a>
        </li>
        <li className="nav-li">
          <a href="#profil" onClick={() => setMenuOpen(false)}>PROFIL</a>
        </li>
        <li className="nav-li">
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>PORTFOLIO</a>
        </li>
        <li className="nav-li">
          <button onClick={openModal} className="modal-button">
          CONTACT
          </button>
        </li>
      </ul>
      
    </nav>
  );
};

export default Navbar;
