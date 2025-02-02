import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ToggleMode from '../../components/Mode';
import Sandra1 from '../../assets/images/sandra1.png';
import Sandra from '../../assets/images/sandra.png'
import About from '../../sections/About';
import Skills from '../../sections/Skills';
import Experiences from "../../sections/Experiences";
import Works from "../../sections/Works";


const Home = () => {
  return (
    <div className='home-body'>
      <div className="header-main">
        <header>
          <Navbar/>
          <div className='header-banner' id="home">
            <img src={Sandra1} alt="Photo de Sandra" />
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
          {/*<Experiences />*/}
          <Works />
          {/*<Snippets />*/}
          <section className="success">
            <h2>Mes réussites</h2>
            <div className="container-img-success">
              <img src={Sandra} alt="Photo de Sandra" />
              <ul className="container-success">
                <li><span className="bold">2010 :</span> J'ai été médaillée d'argent au concours départementale du Meilleur apprenti de France dans le domaine des Métiers de la Mode.</li>
                <li><span className="bold">2017 :</span> J'ai organisé un séminaire avec 5 établissements scolaires et des associations sur les thèmes du harcèlement scolaire et du décrochage scolaire.</li>
                <li><span className="bold">2021 :</span> J'ai récolté 1477€ pour l'association Endofrance lors d'un évènement caritatif sur ma chaîne Twitch.</li>
                <li><span className="bold">2023 :</span> J'ai été l'interlocutrice et référente de l'ACO (Bornes fixes des 24h du Mans).</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
      <Footer/>
    </div>
  )
}

export default Home