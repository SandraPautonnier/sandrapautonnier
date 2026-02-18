import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo_Sukiweb_mono.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin , faSquareGithub , faCodepen } from '@fortawesome/free-brands-svg-icons';



const Footer = () => {

  return (
    <footer>
        <div className='footer-main'>
            <img src={Logo} alt="Logo Sukiweb, une spirale violette" />
            <h3 className='footer-title'>Sukiweb</h3>
            <div className='contact-mail'>
              <Link to="/contact" className="btn">Contactez-moi</Link>
            </div>
            <div className='social-media'>
                <a href="https://www.linkedin.com/in/sandrapautonnier/" target='_blank' rel="noreferrer" aria-label="Lien vers le profil Linkedin de Sandra"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://github.com/SandraPautonnier" target='_blank' rel="noreferrer" aria-label="Lien vers le profil Github de Sandra"><FontAwesomeIcon icon={faSquareGithub} /></a>
                <a href="https://codepen.io/sandrapautonnier" target='_blank' rel="noreferrer" aria-label="Lien vers le profil Codepen de Sandra"><FontAwesomeIcon icon={faCodepen} /></a>
            </div>
        </div>
        <div className='footer-secondary'>
          <p> <Link to="/legalnotice" className='link'>Mentions Légales</Link> &copy; 2026 Sukiweb - Sandra Pautonnier</p>
        </div>
    </footer>
  )
}

export default Footer;