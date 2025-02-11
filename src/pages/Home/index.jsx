import React, { useState } from "react";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactModal from "../../components/ContactModal";
import ToggleMode from '../../components/Mode';
import loader from "../../components/Loader";
import Sandra1 from '../../assets/images/sandra1.png';
import Sandra from '../../assets/images/sandra.png'
import Cv from '../../assets/pdf/CV_Sandra_Pautonnier.pdf';
import About from '../Sections/About';
import Skills from '../Sections/Skills';
/*import Experiences from "../../sections/Experiences"; */
import Works from "../Sections/Works";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin , faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
  const loading = loader(900);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return ( 
      <div className="loading-screen">
        <div className="loader"></div>
          <p>Chargement...</p>
      </div>
    );
  };

  return (
    <div className='home-body'>
      <div className="header-main">
        <header>
          <Navbar openModal={openModal}/>
          <div className='header-banner' id="home">
            <img src={Sandra1} alt="Sandra" />
            <h1>Sandra Pautonnier</h1>
            <p>En recherche d'un poste de développeuse web front-end</p>
            <div className="buttons-social">
              <a href="https://github.com/SandraPautonnier" target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faSquareGithub} />Github</a>
              <a href="https://www.linkedin.com/in/sandrapautonnier/" target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} />Linkedin</a>
              <a href={Cv} target="_blank" rel="noreferrer" download><FontAwesomeIcon icon={faFileArrowDown} /> CV</a>
            </div>
            <ToggleMode />
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
              <img src={Sandra} alt="Sandra" />
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
      <Footer openModal={openModal}/>
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title="Contactez-moi" 
      />
    </div>
  )
}

export default Home