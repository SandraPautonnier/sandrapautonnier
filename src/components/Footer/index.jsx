import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin , faSquareGithub , faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
  return (
    <footer>
        <div className='footer-main'>
            <h3 className='footer-title'>Sandra Pautonnier</h3>
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
          <p><Link to="/legalnotice" className='link'>Mentions Légales</Link> - Copyright 2025</p>
          <div className='heart'>
            <p>Coder avec passion <FontAwesomeIcon
              icon={faHeart}
              className="fa-heart"
            /></p>
          </div>
        </div>
    </footer>
  )
}

export default Footer;