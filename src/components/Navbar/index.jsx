import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ToggleMode from '../../features/Mode';

const Navbar = ({ openModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const [activeUrl, setActiveUrl] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleContactClick = () => {
    openModal();  
    setMenuOpen(false);  
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

  useEffect(() => {
    setActiveUrl(location.pathname); 
  }, [location]);

  return (
    <div className="menu-nav">
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
            <Link to="/" onClick={() => setMenuOpen(false)} className={activeUrl === '/' ? 'active' : ''}>ACCUEIL</Link>
          </li>
          <li className="nav-li">
            <Link to="/profile"  onClick={() => setMenuOpen(false)} className={activeUrl === '/profile' ? 'active' : ''}>PROFIL</Link>
          </li>
          <li className="nav-li">
            <Link to="/portfolio"  onClick={() => setMenuOpen(false)} className={activeUrl === '/portfolio' ? 'active' : ''}>PORTFOLIO</Link>
          </li>
          <li className="nav-li">
            <Link to="/services"  onClick={() => setMenuOpen(false)} className={activeUrl === '/services' ? 'active' : ''}>PRESTATIONS</Link>
          </li>
          <li className="nav-li">
            <button onClick={handleContactClick} className="modal-button">
              CONTACT
            </button>
          </li>
        </ul>
      </nav>
      <ToggleMode />
    </div>

  );
};

export default Navbar;
