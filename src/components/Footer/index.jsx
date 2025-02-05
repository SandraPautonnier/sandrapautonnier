import React from 'react'
import Sandra2 from "../../assets/images/sandra2.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin , faSquareGithub , faCodepen } from '@fortawesome/free-brands-svg-icons';
import ContactModal from "../ContactModal";


const Footer = () => {
  return (
    <footer>
        <div className='footer-main'>
            <div className='contact-mail'>
                <ContactModal buttonText="Contactez-moi via mon formulaire" title="Contactez-moi" buttonClassName="main-button"/>
            </div>
            <img src={Sandra2} alt="Sandra" />
            <div className='social-media'>
                <a href="https://www.linkedin.com/in/sandrapautonnier/" target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://github.com/SandraPautonnier" target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faSquareGithub} /></a>
                <a href="https://codepen.io/sandrapautonnier" target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faCodepen} /></a>
            </div>
        </div>
        <div className='footer-secondary'>
          <p>Mentions Légales - Copyright 2025</p>
        </div>
    </footer>
  )
}

export default Footer;