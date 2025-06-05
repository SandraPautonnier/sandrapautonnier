import { useState } from 'react'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Sandra from '../../assets/images/Sandra.png';
import Meta from "../../components/Meta"; 
//import LoadingScreen from "../../components/Loader";
import ContactModal from "../../components/ContactModal";
import BgDark from "../../assets/images/Background-image-dark.png";
import BgLight from "../../assets/images/Background-image-light.png";
import useThemeStore from "../../store/useThemeStore";
import Tarifaire from "../../components/Tarifaire";

const Services = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
        
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="background-image" style={{background: `url(${isDarkMode ? BgDark : BgLight}) no-repeat center/cover`, height: '100%', minHeight: '100vh'}}> 
        <Meta 
            title="Prestations - Développeuse Web fullstack" 
            description="Développeuse web fullstack freelance spécialisée en React & Node. Création de sites performants, modernes et sur-mesure." 
        />
        {/*<LoadingScreen/>*/}
        <div className='background-color'>
            <div className="header-main">
                <header>
                    <Navbar openModal={openModal}/>
                    <div className='banner'>
                        <img src={Sandra} alt="Portrait de Sandra" />
                        <h2>Offre de lancement</h2>
                        <div className="card card-banner">
                            <p className='intro'>💡 Idéal pour se lancer avec un petit budget :</p>
                            <p><strong>Site vitrine 4 pages + SEO de base + formulaire de contact → 450 € TTC</strong></p>
                        </div>
                    </div>
                </header>
                <main>
                    <Tarifaire/>
                    <section>
                        <h3>Infos utiles :</h3>
                        <ul>
                            <li>➡️Les tarifs sont indicatifs et peuvent varier selon la complexité du projet.</li>
                            <li>➡️Des forfaits personnalisés sont possibles en fonction de vos besoins.</li>
                            <li>➡️Tous les sites sont responsive (mobile/tablette) et optimisés pour les performances.</li>
                            <li>➡️Accompagnement possible pour la charte graphique, l’hébergement, la maintenance, la formation ou les réseaux sociaux.</li>
                        </ul>
                    </section>
                    <button className="btn dim" onClick={openModal}>
                        Demandez votre devis
                    </button>
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