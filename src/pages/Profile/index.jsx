import { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Meta from "../../components/Meta";
import Sandra3 from '../../assets/images/Sandra3.png';
import Coupe from '../../assets/images/coupe.png';
import ContactModal from "../../components/ContactModal";
import Skills from '../Sections/Skills';
import BgDark from "../../assets/images/Background-image-dark.png";
import BgLight from "../../assets/images/Background-image-light.png";
import useThemeStore from "../../store/useThemeStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faJs, faSass, faGithub, faNode } from '@fortawesome/free-brands-svg-icons';

const Profile = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="background-image" style={{background: `url(${isDarkMode ? BgDark : BgLight}) no-repeat center/cover`, height: '100%', minHeight: '100vh'}}> 
        <Meta 
            title="Profil - Développeuse Web fullstack" 
            description="Développeuse web fullstack freelance spécialisée en React & Node. Création de sites performants, modernes et sur-mesure." 
        />
        <div className='background-color'>
            <div className="header-main">
                <header>
                    <Navbar openModal={openModal}/>
                    <div className='banner'>
                        <img src={Sandra3} alt="Sandra" />
                        <h2>A propos de moi</h2>
                        <div className="card profile">
                        <p className='intro-profile'>Développeuse web fullstack, je conçois des applications modernes avec <strong>React</strong>, <strong>Node.js</strong> et <strong>MongoDB</strong>, en veillant à créer des interfaces à la fois fluides, intuitives et centrées utilisateur.<br></br>
                        Avant de plonger dans le code, j’ai exploré des univers très variés : <strong>la couture</strong>, où j’ai appris la précision et le sens du détail ; <strong>le commerce</strong>, qui m’a donné le goût de l’organisation et du contact humain ; <strong>la gestion de projet</strong> et <strong>la communication</strong>, qui m’ont permis de structurer ma pensée, de collaborer efficacement et de raconter des histoires claires et engageantes.<br></br>
                        Aujourd’hui, je mets toute cette richesse au service du développement web. <strong>Curieuse</strong>, <strong>autonome</strong> et toujours en quête de sens, je m’épanouis dans les projets qui allient technique, créativité et utilité.<br></br> 
                        Mon ambition : continuer à apprendre, à expérimenter et à créer des outils numériques qui ont de l’impact.</p>
                        </div>
                    </div>
                    <div className='technos'>
                        <FontAwesomeIcon icon={faSass} />
                        <FontAwesomeIcon icon={faJs} />
                        <FontAwesomeIcon icon={faReact} />
                        <FontAwesomeIcon icon={faNode} />
                        <FontAwesomeIcon icon={faGithub} />
                    </div>
                </header>
                <main>
                    <Skills />
                    <section>
                        <h2>Mon parcours</h2>
                        <div className='container-mobile'>
                            <div className="card insert cer certificate1">
                                <span>2008-2010</span>
                                <h3>BEP Métiers de la Mode</h3>
                                </div>  
                            <div className="card insert cer certificate2">
                                <span>2012-2014</span>
                                <h3>BAC PRO Commerce</h3>
                                </div>
                            <div className="card insert exp experience1">
                                <span>2014-2016</span>
                                <h3>Vendeuse Prêt-à-porter</h3>
                                <p>Noz - Sergent Major</p></div>
                            <div className="card insert exp experience2">
                                <span>2016-2017</span>
                                <h3>Chef de projet évenementiel</h3>
                                <p>Service civique : Mission autonome de A à Z</p></div>
                            <div className="card insert exp experience4">
                                <span>2021-2024</span>
                                <h3>Chargé de projets</h3>
                                <p>Enedis</p></div>
                            <div className="card insert cer certificate4">
                                <span>2024-2025</span>
                                <h3>Titre RNCP Développeur informatique</h3></div>
                            <div className="card insert exp experience5">
                                <span>2025-auj.</span>
                                <h3>Développeuse web full stack</h3>
                                <p>Freelance</p></div>
                        </div>
                        <div className="container-desktop">
                            <div className="card insert exp experience4">
                                <span>2021-2024</span>
                                <h3>Chargé de projets</h3>
                                <p>Enedis</p></div>
                            <div className="card insert exp experience3">
                                <span>2018-2021</span>
                                <h3>Assistante administrative et technique</h3>
                                <p>Université du Mans</p></div>
                            <div className="card insert per personal1">
                                <span>2010</span>
                                <h3>Médaillée d'argent au concours départemental du meilleur apprenti de France</h3>
                                </div>
                            <div className="card insert cer certificate1">
                                <span>2008-2010</span>
                                <h3>BEP Métiers de la Mode</h3>
                                </div>
                            <div className="card insert per personal2">
                                <span>2014</span>
                                <h3>Dessins / Peintures</h3></div>
                            <div className="card insert cer certificate2">
                                <span>2012-2014</span>
                                <h3>BAC PRO Commerce</h3>
                                </div>
                            <div className="card insert exp experience1">
                                <span>2014-2016</span>
                                <h3>Vendeuse Prêt-à-porter</h3>
                                <p>Noz - Sergent Major</p></div>
                            <div className="card insert exp experience2">
                                <span>2016-2017</span>
                                <h3>Chef de projet évenementiel</h3>
                                <p>Service civique : Mission autonome de A à Z</p></div>
                            <div className="card insert cer certificate3">
                                <span>2017-2020</span>
                                <h3>BTS Support à l'action managériale</h3></div>
                            <div className="card insert per personal3">
                                <span>2018-auj.</span>
                                <h3>Créatrice de contenu jeux-vidéo</h3></div>
                            <div className="card insert per personal4">
                                <span>2021-2024</span>
                                <h3>Projets web</h3></div>
                            <div className="card insert exp experience5">
                                <span>2025-auj.</span>
                                <h3>Développeuse web full stack</h3>
                                <p>Freelance</p></div>
                            <div className="card insert cer certificate4">
                                <span>2024-2025</span>
                                <h3>Titre RNCP Développeur informatique</h3></div>
                        </div>
                    </section>
                    <section className="success">
                        <h2>Mes réussites</h2>
                        <div className="container-img-success">
                            <img src={Coupe} alt="Coupe de réussite" />
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
            <Link to="/portfolio" className="btn dim">Découvrez mes réalisations</Link>
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