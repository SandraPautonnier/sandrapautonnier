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
                <li><span className="bold">2010 :</span> Dans le domaine des Métiers de la Mode, j'ai été médaillée d'argent au concours départementale du Meilleur Apprenti de France.</li>
                <li><span className="bold">2017 :</span> Lors de mon service civique, j'ai organisé un séminaire de A à Z avec 5 établissements scolaires et des associations sur les thèmes du harcèlement scolaire et du décrochage scolaire.</li>
                <li><span className="bold">2021 :</span> Lors d'un évènement caritatif sur ma chaîne Twitch, j'ai récolté 1477€ pour l'association Endofrance.</li>
                <li><span className="bold">2023 :</span> Chez Enedis, j'ai été l'interlocutrice et référente de l'ACO (Automobile Club de l'Ouest) pour le centenaire des 24h du Mans (Bornes fixes).</li>
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