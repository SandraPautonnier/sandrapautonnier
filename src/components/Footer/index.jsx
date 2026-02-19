import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo_Sukiweb_mono.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faSquareGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faMapLocationDot, faEnvelope, faArrowRight, faShareNodes } from "@fortawesome/free-solid-svg-icons";



const Footer = () => {

  return (
    <footer>
      <div className='footer-main'>
        <img src={Logo} alt="Logo Sukiweb, une spirale violette" />
        <h3 className='footer-title'>Sukiweb</h3>
        
      </div>
      
        
      
      <div className="contact-info">
        <div className="contact-info-item">
          <FontAwesomeIcon icon={faMapLocationDot} className="contact-icon" />
          <div className="contact-info-content">
            <h3>Localisation</h3>
            <ul>
              <p>En France à distance / Le Mans et alentours</p>
            </ul>
          </div>
        </div>

        <div className="contact-info-item">
          <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
          <div className="contact-info-content">
            <h3>Email</h3>
            <a href="mailto:contact@sandrapautonnier.com" aria-label="Envoyer un email à Sandra">
              contact@sandrapautonnier.com
            </a>
          </div>
        </div>

        <div className="contact-info-item">
          <FontAwesomeIcon icon={faShareNodes} className="contact-icon" />
          <div className="social">
            <h3>Réseaux sociaux</h3>
            <div className="social-links">
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
      <p className="text-notice"> <Link to="/legalnotice" className='link'>Mentions Légales</Link> &copy; {new Date().getFullYear()} Sukiweb - Sandra Pautonnier</p>
    </footer>
  )
}

export default Footer;