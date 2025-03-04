import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactModal from "../../components/ContactModal";
import loader from "../../components/Loader";
import Sandra1 from '../../assets/images/sandra1.png';
import Cv from '../../assets/pdf/CV_Sandra_Pautonnier.pdf';
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


const Home = () => {
  const loading = loader(900);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isDarkMode = useThemeStore((state) => state.isDarkMode);

    const iconMap = {
      'fa-laptop-code': faLaptopCode,
      'fa-magnifying-glass-chart': faMagnifyingGlassChart,
      'fa-wrench': faWrench
    };


  if (loading) {
    return ( 
      <div className="loading-screen">
        <div className="loader"></div>
          <p>Chargement...</p>
      </div>
    );
  };

  return (
    <div className="background-image" style={{background: `url(${isDarkMode ? BgDark : BgLight}) no-repeat center/cover`, height: '100%', minHeight: '100vh'}}> 
      <div className='background-color'>
        <div className="header-main">
          <header>
            <Navbar openModal={openModal}/>
            <div className='header-banner' id="home">
              <img src={Sandra1} alt="Sandra" />
              <h1>Sandra Pautonnier</h1>
              <p>Développeuse web front-end</p>
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
                    <li><FontAwesomeIcon icon={faReact} /><strong>Techno favorite :</strong> React</li>
                    <li><FontAwesomeIcon icon={faCode} /><strong>Compétences principales :</strong> Réaliser un portfolio dynamique avec une interface dédiée et Créer une application web fluide et sécurisée</li>
                    <li><FontAwesomeIcon icon={faAward} /><strong>Dernière formation :</strong> Intégrateur Web Openclassrooms</li>
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