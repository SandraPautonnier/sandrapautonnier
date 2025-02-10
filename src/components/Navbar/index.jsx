import React, { useState, useEffect, useRef } from "react";

const Navbar = ({ openModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav ref={navRef}>
      {/* Bouton hamburger */}
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
      {/* Menu de navigation */}
      <ul className={`nav-ul ${menuOpen ? "open" : ""}`}>
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
