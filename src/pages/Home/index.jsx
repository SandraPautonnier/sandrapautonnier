import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeaderImage from '../../assets/images/image_portrait_dessin_sandra_header.webp';
import Cv from '../../assets/pdf/CV-Sandra-Pautonnier.pdf';
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
        title="Sukiweb - Développeuse Web fullstack" 
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
                    <div className="slide-content" key={item.id}>
                      <img src={`${item.cover}`} alt={`Projet ${item.titlework}`} />
                      <div className="slide-description">
                        <div>
                          <h3>{item.titlework}</h3>
                          <span className="work-language">{item.category}</span>
                        </div>
                        <Link to={`/portfolio/${item.id}`} className="btn" onClick={() => window.scrollTo(0, 0)}>
                          Voir le projet
                        </Link>
                      </div>
                    </div>
                ))}
              </Carousel>
              <Link to="/portfolio" onClick={handleScrollToTop} className="btn">Voir plus de projets</Link>
              <p className="catch">Des projets réalisés avec passion !</p>
            </section>
            <section>

            </section>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home