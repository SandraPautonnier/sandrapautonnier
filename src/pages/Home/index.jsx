import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactModal from "../../components/ContactModal";
import loader from "../../components/Loader";
import Sp from "../../assets/images/SP.png";
import Sandra1 from '../../assets/images/sandra1.png';
import Cv from '../../assets/pdf/CV-Sandra-Pautonnier.pdf';
import AgeCalculator from "../../features/AgeCalculator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin , faSquareGithub , faReact } from '@fortawesome/free-brands-svg-icons';
import { faFileArrowDown , faUser , faFlask , faCode , faAward , faLaptopCode , faMagnifyingGlassChart , faWrench } from '@fortawesome/free-solid-svg-icons';
import BgDark from "../../assets/images/Background-image-dark.png";
import BgLight from "../../assets/images/Background-image-light.png";
import useThemeStore from "../../store/useThemeStore";
import Carousel from "../../features/Carousel";
import HookWorks from "../../assets/content/works.json";
import Services from "../../assets/content/services.json";
import Meta from "../../components/Meta";


const Home = () => {
  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isDarkMode = useThemeStore((state) => state.isDarkMode);

    const iconMap = {
      'fa-laptop-code': faLaptopCode,
      'fa-magnifying-glass-chart': faMagnifyingGlassChart,
      'fa-wrench': faWrench
    };

  /*const loading = loader(900);

  if (loading) {
    return ( 
      <div className="loading-screen">
        <div className="loader"></div>
          <p>Chargement...</p>
      </div>
    );
  };*/

  return (
    <div className="background-image" style={{background: `url(${isDarkMode ? BgDark : BgLight}) no-repeat center/cover`, height: '100%', minHeight: '100vh'}}> 
      <Meta 
        title="Accueil - Développeuse Web fullstack" 
        description="Développeuse web fullstack freelance spécialisée en React & Node. Création de sites performants, modernes et sur-mesure." 
        image={Sandra1} 
        favicon={Sp}
      />
      <div className='background-color'>
        <div className="header-main">
          <header>
            <Navbar openModal={openModal}/>
            <div className='header-banner' id="home">
              <img src={Sandra1} alt="Sandra" />
              <h1>Sandra Pautonnier</h1>
              <p>Développeuse web full stack</p>
              <div className="buttons-social">
                <a href="https://github.com/SandraPautonnier" target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faSquareGithub} />Github</a>
                <a href="https://www.linkedin.com/in/sandrapautonnier/" target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} />Linkedin</a>
                <a href={Cv} target="_blank" rel="noreferrer" download><FontAwesomeIcon icon={faFileArrowDown} /> CV</a>
              </div>
            </div>
          </header>
          <main>
            <section className="hook-about">
              <h2>Qui suis-je?</h2>
              
              <div className="container-hook-about">
                <div className="card-hook-about">
                  <ul className="card profile">
                    <div className="card-user">
                      <FontAwesomeIcon icon={faUser} />
                      <li><strong>Prénom :</strong> Sandra</li>
                      <li><strong>Age :</strong> <AgeCalculator birthDate="1992-07-28" /> ans</li>
                    </div>
                    <li><FontAwesomeIcon icon={faReact} /><strong>Technos :</strong> React, Node et MongoDB</li>
                    <li><FontAwesomeIcon icon={faCode} /><strong>Compétences principales :</strong> Réaliser un site web dynamique avec une interface dédiée et créer une application web fluide et sécurisée</li>
                    <li><FontAwesomeIcon icon={faAward} /><strong>Dernière formation :</strong> Titre RNCP Développeur Informatique</li>
                    <li><FontAwesomeIcon icon={faFlask} /><strong>Autres expériences :</strong> Commerce et gestion de projet</li>
                  </ul>
                </div>
                <div className="text-hook-about">
                  <p>Curieuse et créative, je m’intéresse à de nombreux domaines et cherche constamment à comprendre comment les choses fonctionnent. <br /> Mon autonomie me permet de relever des défis variés et d’acquérir rapidement de nouvelles compétences.<br /> Grâce à cela, j’ai une riche expérience dans différents domaines.</p>
                  <ul className='tags'>
                    <li className='tag'>#curieuse</li>
                    <li className='tag'>#créative</li>
                    <li className='tag'>#autonome</li>
                  </ul>
                  <Link to="/profile" className="btn">En savoir plus</Link>
                </div>
              </div>
              <p className="catch">Une développeuse qui parle votre langue (et aussi JavaScript !).</p>
            </section>
            <section className="hook-works">
              <h2>Quelques réalisations</h2>
                <Carousel>
                {HookWorks.map((item) => (
                  <div key={item.index} className="carousel-slide"> 
                    <Link to={item.link} target='_blank'>
                      <div className="slide-content">
                        <img src={`${item.cover}`} alt={`${item.titlework}`} />
                        <div className="slide-description">
                          <h3>{`${item.titlework}`}</h3>
                          <span className="work-language">{item.language}</span>
                          <span className="work-tools">{item.tools}</span>
                        </div>
                      </div>
                    </Link>
                  </div>  
                ))}
              </Carousel>
              <Link to="/portfolio" className="btn">Voir plus de projets</Link>
              <p className="catch">Des projets réalisés avec passion !</p>
            </section>
            <section className="hook-services">
              <h2>Ce que je vous propose</h2>
              <div className="container-hook-services">
                {Services.map(Service => (
                  <div key={Service.index} className="card service">
                    <FontAwesomeIcon icon={iconMap[Service.icon]} />
                    <h3>{Service.title}</h3>
                    <p>{Service.description}</p>
                  </div>
                ))}
                
              </div>
              <Link to="/services" className="btn">Voir les tarifs</Link>
              <p className="catch">Flexible, moderne et humaine. C’est ça, le sur-mesure.</p>
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

export default Home