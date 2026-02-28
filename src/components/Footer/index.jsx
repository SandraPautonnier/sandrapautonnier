import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo_Sukiweb_color.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faSquareGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faMapLocationDot, faEnvelope, faArrowRight, faShareNodes } from "@fortawesome/free-solid-svg-icons";



const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer>
      <div className='footer-main'>
        <img src={Logo} alt="Logo Sukiweb, une spirale violette" />
        <h3 className='footer-title'>Sukiweb - Sandra Pautonnier</h3>
        
      </div>
      
        
      
      <div className="contact-info">
        <div className="contact-info-item">
          <FontAwesomeIcon icon={faMapLocationDot} className="contact-icon" />
          <div className="contact-info-content">
            <h3>Localisation</h3>
            <p className="content">Le Mans et alentours<br />En France à distance</p>
          </div>
        </div>

        <div className="contact-info-item">
          <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
          <div className="contact-info-content">
            <h3>Devis & contact</h3>
            <a className="content" href="mailto:contact@sandrapautonnier.com" aria-label="Envoyer un email à Sandra">
              Faire un devis
            </a>
            <a className="content" href="mailto:contact@sandrapautonnier.com" aria-label="Envoyer un email à Sandra">
              Me contacter
            </a>
          </div>
        </div>

        <div className="contact-info-item">
          <FontAwesomeIcon icon={faShareNodes} className="contact-icon" />
          <div className="social">
            <h3>Réseaux sociaux</h3>
            <div className="content social-links">
              <a 
                href="https://www.facebook.com/people/Sandra-Créatrice-Web-Intuitive/100063567206449/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>              
              <a
                href="https://www.linkedin.com/in/sandra-pautonnier/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://github.com/sandrapautonnier"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faSquareGithub} />
              </a>
            </div>
          </div>

        </div>
      </div>
      <p className="text-notice"> <Link to="/legalnotice" onClick={handleScrollToTop} className='link'>Mentions Légales</Link> &copy; {new Date().getFullYear()} Sukiweb - Sandra Pautonnier</p>
    </footer>
  )
}

export default Footer;