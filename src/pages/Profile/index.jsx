import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactModal from "../../components/ContactModal";
import Skills from '../Sections/Skills';
import BgDark from "../../assets/images/Background-image-dark.png";
import BgLight from "../../assets/images/Background-image-light.png";
import useThemeStore from "../../store/useThemeStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faJs, faSass, faGithub, faNodeJs, faNode } from '@fortawesome/free-brands-svg-icons';

const Profile = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="background-image" style={{background: `url(${isDarkMode ? BgDark : BgLight}) no-repeat center/cover`, height: '100%', minHeight: '100vh'}}> 
        <div className='background-color'>
            <div className="header-main">
                <header>
                    <Navbar openModal={openModal}/>
                </header>
                <main>
                    <Skills />
                    <section>
                        <h2>Les technos que j'adore utiliser</h2>
                        <div className='technos'>
                            <FontAwesomeIcon icon={faSass} />
                            <FontAwesomeIcon icon={faJs} />
                            <FontAwesomeIcon icon={faReact} />
                            <FontAwesomeIcon icon={faNode} />
                            <FontAwesomeIcon icon={faGithub} />
                            <FontAwesomeIcon icon={faNodeJs} />
                        </div>
                    </section>
                    <section>
                        <h2>Mon parcours</h2>
                        <div className="container">
                            <div className="card insert exp experience4">
                                <span>2021-2024</span>
                                <h3>Chargé de projets</h3>
                                <p>Enedis</p></div>
                            <div className="insert exp experience3">
                                <span>2018-2021</span>
                                <h3>Assistante administrative et technique</h3>
                                <p>Université du Mans</p></div>
                            <div className="insert per personal1">
                                <span>2010</span>
                                <h3>Médaillée d'argent au concours départemental du meilleur apprenti de France</h3>
                                </div>
                            <div className="insert cer certificate1">
                                <span>2008-2010</span>
                                <h3>BEP Métiers de la Mode</h3>
                                </div>
                            <div className="insert per personal2">
                                <span>2014</span>
                                <h3>Dessins / Peintures</h3></div>
                            <div className="insert cer certificate2">
                                <span>2012-2014</span>
                                <h3>BAC PRO Commerce</h3>
                                </div>
                            <div className="insert exp experience1">
                                <span>2014-2016</span>
                                <h3>Vendeuse Prêt-à-porter</h3>
                                <p>Noz - Sergent Major</p></div>
                            <div className="insert exp experience2">
                                <span>2016-2017</span>
                                <h3>Chef de projet évenementiel</h3>
                                <p>Service civique : Mission autonome de A à Z</p></div>
                            <div className="insert cer certificate3">
                                <span>2017-2020</span>
                                <h3>BTS Support à l'action managériale</h3></div>
                            <div className="insert per personal3">
                                <span>2018-auj.</span>
                                <h3>Créatrice de contenu jeux-vidéo</h3></div>
                            <div className="insert per personal4">
                                <span>2021-2024</span>
                                <h3>Projets web</h3></div>
                            <div className="insert exp experience5">
                                <span>2025-auj.</span>
                                <h3>Développeuse Web React</h3>
                                <p>Freelance</p></div>
                            <div className="insert cer certificate4">
                                <span>2017-2020</span>
                                <h3>Titre RNCP Développeur informatique</h3></div>
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
    </div>
  )
}

export default Profile