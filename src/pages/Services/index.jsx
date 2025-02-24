import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactModal from "../../components/ContactModal";
import BgDark from "../../assets/images/Background-image-dark.png";
import BgLight from "../../assets/images/Background-image-light.png";
import useThemeStore from "../../store/useThemeStore";

const Services = () => {

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

export default Services