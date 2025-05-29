import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Meta from "../../components/Meta";
import Sp from "../../assets/images/SP.png";
import Sandra1 from '../../assets/images/sandra1.png';
import ContactModal from "../../components/ContactModal";
import Works from "../Sections/Works";
import BgDark from "../../assets/images/Background-image-dark.png";
import BgLight from "../../assets/images/Background-image-light.png";
import useThemeStore from "../../store/useThemeStore";


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
            image={Sandra1} 
            favicon={Sp}
        />
        <div className='background-color'>
            <div className="header-main">
                <header>
                    <Navbar openModal={openModal}/>
                </header>
                <main>
                    <Works />
                    {/*<section>
                        <h2>Mes Snippets</h2>
                    </section>*/}
                    
                </main>
            </div>
            <Link to="/services" className="btn dim">Voir mes prestations</Link>
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