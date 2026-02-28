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
            <Link to="/portfolio"  onClick={() => setMenuOpen(false)} className={activeUrl === '/portfolio' ? 'active' : ''}>PORTFOLIO</Link>
          </li>
          <li className="nav-li">
            <Link to="/profile"  onClick={() => setMenuOpen(false)} className={activeUrl === '/profile' ? 'active' : ''}>À PROPOS</Link>
          </li>
          <li className="nav-li">
            <Link to="/price"  onClick={() => setMenuOpen(false)} className={activeUrl === '/price' ? 'active' : ''}>DEVIS</Link>
          </li>
          <li className="nav-li">
            <Link to="/contact"  onClick={() => setMenuOpen(false)} className={activeUrl === '/contact' ? 'active' : ''}>CONTACT</Link>
          </li>
        </ul>
      </nav>
    </div>

  );
};

export default Navbar;
