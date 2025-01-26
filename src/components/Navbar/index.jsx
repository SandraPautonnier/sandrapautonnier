import React from 'react';
import ContactModal from '../ContactModal';


const Navbar = () => {

  return (
    <nav>
        {/*<h2>SP</h2>*/}
        <ul className='nav-ul'>
            <li><a href="#home">ACCEUIL</a></li>
            <li><a href="#profil">PROFIL</a></li>
            <li><a href="#portfolio">PORTFOLIO</a></li>
            <li><ContactModal buttonText="CONTACT" title="Contactez-moi" buttonClassName="modal-button"/></li>
        </ul>
    </nav>
  )
}

export default Navbar