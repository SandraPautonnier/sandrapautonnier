import { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Docs from '../../assets/images/Portfolio.svg';
import Meta from "../../components/Meta";
import ContactModal from "../../components/ContactModal";
import Works from "../Sections/Works";
import BgDark from "../../assets/images/Background-image-dark.webp";
import BgLight from "../../assets/images/Background-image-light.webp";
import useThemeStore from "../../store/useThemeStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
} from "@fortawesome/free-solid-svg-icons";


const Portfolio = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="background-image" style={{background: `url(${isDarkMode ? BgDark : BgLight}) no-repeat center/cover`, height: '100%', minHeight: '100vh'}}> 
        <Meta 
            title="Portfolio - Développeuse Web fullstack" 
            description="Développeuse web fullstack freelance spécialisée en React & Node. Création de sites performants, modernes et sur-mesure." 
        />
        <div className='background-color'>
            <div className="header-main">
                <header>
                    <Navbar openModal={openModal}/>
                        <div className='banner'>
                            <img src={Docs} alt="Illustration de documents" />
                            <h2>Mes projets</h2>
                            <div className="card card-banner">
                                <p className='intro'>Passionnée par le web et toujours à l’écoute des besoins, je conçois des solutions sur mesure pour donner vie à chaque idée. Découvrez les projets qui ont enrichi mon parcours.</p>
                            </div>
                        </div>
                        <div className='card-works'>
                            <a href="http://sandrapautonnier.com">
                                <img src="" alt="" />
                                <h3></h3>
                                <span></span>
                                <span></span>
                            </a>
                            <div className="description-collapse">
                                <button
                                    className="collapse-button"
                                    onClick={() => "text"}
                                >
                                <i></i>
                                </button>
                                <div></div>
                            </div>
                        </div>                    
                </header>
                <main>
                    <Works />
                </main>
            </div>
            <Link to="/services" className="btn dim">Voir les prestations</Link>
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

export default Portfolio