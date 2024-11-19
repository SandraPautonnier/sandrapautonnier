import React from 'react'
import Sandra2 from "../../assets/images/sandra2.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-solid-svg-icons';

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
                <a href=""><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href=""></a><i></i>
                <a href=""></a><i></i>
            </div>
        </div>
        <div className='footer-secondary'>

        </div>
    </footer>
  )
}

export default Footer