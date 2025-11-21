import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeaderImage from '../../assets/images/image_portrait_dessin_sandra_header.webp';
import Sandra2 from "../../assets/images/sandra2.webp";
import Cv from '../../assets/pdf/CV-Sandra-Pautonnier.pdf';
import AgeCalculator from "../../features/AgeCalculator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin , faSquareGithub , faReact } from '@fortawesome/free-brands-svg-icons';
import { faFileArrowDown , faUser , faFlask , faCode , faAward , faMagnifyingGlass , faWrench } from '@fortawesome/free-solid-svg-icons';
import Carousel from "../../features/Carousel";
import HookWorks from "../../assets/content/worksList.json";
import Meta from "../../components/Meta";
import Services from "../../assets/content/services.json";


const Home = () => {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="home">
      <Meta 
        title="Accueil - Développeuse Web fullstack" 
        description="Développeuse web fullstack freelance spécialisée en React & Node. Création de sites performants, modernes et sur-mesure."  
      />
      <div className='background-color'>
        <div className="header-main">
          <header>
            <Navbar />
            <div className='header-banner ' id="home">
              <img src={HeaderImage} alt="Portrait dessin de Sandra réalisé par IA"/>
              <h2>Développeuse & Créatrice Web Intuitive</h2>
              <p>Créativité, écoute & clarté ! Au service de votre image en ligne.
              </p>
              <div className="buttons-social">
                <a href="https://github.com/SandraPautonnier" target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faSquareGithub} />Github</a>
                <a href="https://www.linkedin.com/in/sandrapautonnier/" target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} />Linkedin</a>
                <a href={Cv} target="_blank" rel="noreferrer" download aria-label="Télécharger le CV de Sandra en document pdf"><FontAwesomeIcon icon={faFileArrowDown} /> CV</a>
              </div>
            </div>
          </header>
          <main>
            <section className="hook-services">
              <h2>Ce que je propose</h2>
              <div className="container-hook-services">
                {Services.map(Service => {
                  const iconMap = {
                    'faCode': faCode,
                    'faMagnifyingGlass': faMagnifyingGlass,
                    'faWrench': faWrench,
                  };
                  return (
                    <div key={Service.id} className="card service">
                      <FontAwesomeIcon icon={iconMap[Service.icon]} />
                      <h3>{Service.title}</h3>
                      <p>{Service.description}</p>
                    </div>
                  );
                })}
              </div>
              <Link to="/contact" className="btn">Contactez-moi</Link>
              <p className="catch">Flexible, moderne et humaine. <br />C'est ça, le sur-mesure !</p>
            </section>
            <section className="hook-works">
              <h2>Quelques projets</h2>
                <Carousel>
                {HookWorks.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3).map((item) => (
                  <div key={item.index} className="carousel-slide"> 
                    <Link to={item.link} target='_blank'>
                      <div className="slide-content">
                        <img src={`${item.cover}`} alt={`Projet ${item.titlework}`} />
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
              <Link to="/portfolio" onClick={handleScrollToTop} className="btn">Voir plus de projets</Link>
              <p className="catch">Des projets réalisés avec passion !</p>
            </section>
            <section className="hook-about">
              <h2>Qui suis-je?</h2>
              <div className="container-hook-about">
                <div className="text-hook-about">
                  <div className="box">
                  <img src={Sandra2} alt="Photo de Sandra" />
                  <p><span>Sandra Pautonnier </span> <br />Développeuse Fullstack passionnée de <AgeCalculator birthDate="1992-07-28" /> ans. J'aime analyser, créer et développer pour donner vie à des projets web uniques. <br />
                  Mon parcours mêle artistique, commerce, gestion de projet, création de contenu et développement web. Une combinaison qui me permet de comprendre les besoins réels de mes clients.</p>
                  </div>
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
          </main>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home