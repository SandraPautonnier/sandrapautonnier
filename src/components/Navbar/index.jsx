import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContactModal from '../ContactModal';


const Navbar = () => {
  return (
    <nav>
        <h2>SP</h2>
        <ul className='nav-ul'>
            <li>ACCUEIL</li>
            <li>PROFIL</li>
            <li>PORTFOLIO</li>
            <li><ContactModal buttonText="CONTACT" title="Contactez-moi" buttonClassName="modal-button"/></li>
        </ul>
    </nav>
  )
}

export default Navbar