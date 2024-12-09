import React from 'react'
import Sandra2 from "../../assets/images/sandra2.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin , faSquareGithub , faCodepen } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer>
        <div className='footer-main'>
            <div className='contact-mail'>
                <button></button>
                <p>ou par mail : <a href="mailto:contact@sandrapautonnier.com">contact@sandrapautonnier.com</a></p>
            </div>
            <img src={Sandra2} alt="Sandra" />
            <div className='social-media'>
                <a href="https://www.linkedin.com/in/sandrapautonnier/" target='_blank'><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://github.com/SandraPautonnier" target='_blank'><FontAwesomeIcon icon={faSquareGithub} /></a>
                <a href="https://codepen.io/sandrapautonnier" target='_blank'><FontAwesomeIcon icon={faCodepen} /></a>
            </div>
        </div>
        <div className='footer-secondary'>
          <p>Mentions Légales - no copyright</p>
        </div>
    </footer>
  )
}

export default Footer