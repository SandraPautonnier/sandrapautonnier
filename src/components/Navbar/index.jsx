import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav>
        <h2>SP</h2>
        <ul className='nav-ul'>
            <li>ACCUEIL</li>
            <li>PROFIL</li>
            <li>PORTFOLIO</li>
            <li>CONTACT</li>
        </ul>
    </nav>
  )
}

export default Navbar