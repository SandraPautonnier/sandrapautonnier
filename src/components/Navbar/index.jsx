import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/Logo_Sukiweb_mono.webp";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const [activeUrl, setActiveUrl] = useState('');

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

  useEffect(() => {
    setActiveUrl(location.pathname); 
  }, [location]);

  return (
    <div className="menu-nav">
      <div className="logo-h1">
        <img className="logo" src={Logo} alt="Logo Sukiweb, une spirale violette" />
        <h1>Sukiweb</h1>
      </div>
      <nav ref={navRef} aria-label="Menu principal">
        {/* Bouton hamburger */}
        <div className="hamburger" role="button" tabIndex="0" aria-label="Ouvrir le menu" onClick={toggleMenu} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleMenu(); }}>
          {menuOpen ? (
            <span className="close-nav" role="button" tabIndex="0" aria-label="Fermer le menu" onClick={toggleMenu} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleMenu(); }}>&times;</span>
          ) : (
            <>
              <div className="bar" aria-hidden="true" ></div>
              <div className="bar" aria-hidden="true"></div>
              <div className="bar" aria-hidden="true"></div>
            </>
          )}
        </div>
        {/* Menu de navigation */}
        <ul className={`nav-ul ${menuOpen ? "open" : ""}`}>
          <li className="nav-li">
            <Link to="/" aria-label="Accueil" onClick={() => setMenuOpen(false)} className={activeUrl === '/' ? 'active' : ''}>ACCUEIL</Link>
          </li>
          <li className="nav-li">
            <Link to="/portfolio" aria-label="Portfolio" onClick={() => setMenuOpen(false)} className={activeUrl === '/portfolio' ? 'active' : ''}>PORTFOLIO</Link>
          </li>
          <li className="nav-li">
            <Link to="/profile" aria-label="À propos" onClick={() => setMenuOpen(false)} className={activeUrl === '/profile' ? 'active' : ''}>À PROPOS</Link>
          </li>
          <li className="nav-li">
            <Link to="/price" aria-label="Devis" onClick={() => setMenuOpen(false)} className={activeUrl === '/price' ? 'active' : ''}>DEVIS</Link>
          </li>
          <li className="nav-li">
            <Link to="/contact" aria-label="Contact" onClick={() => setMenuOpen(false)} className={activeUrl === '/contact' ? 'active' : ''}>CONTACT</Link>
          </li>
        </ul>
      </nav>
    </div>

  );
};

export default Navbar;
