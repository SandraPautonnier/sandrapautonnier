import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ToggleMode from '../../components/Mode';
import Sandra1 from '../../assets/images/sandra1.png';
import About from '../../sections/About';
import Skills from '../../sections/Skills';
import Experiences from "../../sections/Experiences";

const Home = () => {
  return (
    <div className='home-body'>
      <header>
        <Navbar/>
        <div className='header-banner'>
          <img src={Sandra1} alt="Sandra" />
          <h1>Sandra Pautonnier</h1>
          <p>Developpeuse Web Front-end</p>
          <div className='all-mode'>
            <ToggleMode />
          </div>
        </div>
      </header>
      <main>
        <About />
        <Skills />
        <Experiences />
      </main>
      <Footer/>
    </div>
  )
}

export default Home