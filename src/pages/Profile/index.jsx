import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactModal from "../../components/ContactModal";
import Skills from '../Sections/Skills';
import BgDark from "../../assets/images/Background-image-dark.png";
import BgLight from "../../assets/images/Background-image-light.png";
import useThemeStore from "../../store/useThemeStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faJs, faSass, faGithub, faNodeJs } from '@fortawesome/free-brands-svg-icons';

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
                            <FontAwesomeIcon icon={faGithub} />
                            <FontAwesomeIcon icon={faNodeJs} />
                        </div>
                    </section>
                    <section>
                        <h2>Mes Expériences</h2>
                        <div class="label-work">
                            <div class="base">
                                <div class="text">Vendeuse prêt-à-porter</div>
                                <div class="pointer"></div>  
                            </div>
                        </div>
                    </section>
                    <section>
                        <h2>Mes Formations</h2>
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