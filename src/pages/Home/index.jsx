import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeaderImage from '../../assets/images/Image_header.webp';
import MainImage from '../../assets/images/image_poignee-de-main.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin , faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import { faCode , faAward , faMagnifyingGlass , faWrench, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
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
              <div className="header-content">
                <h2>Développeuse & Créatrice <br /> Web Intuitive</h2>
                <p className="base-text">Créativité, écoute & clarté ! <br /> Au service de votre image en ligne.
                </p>
                <div className="buttons-social">
                  <a href="/price" aria-label="Faire une estimation de votre projet" className="btn-secondary">Faire une estimation de votre projet</a>
                  <a href="/contact" aria-label="Navigation vers ma page contact" className="btn-secondary">Contactez-moi</a>
                  <a href="https://www.linkedin.com/in/sandrapautonnier/" target='_blank' rel="noreferrer" aria-label="Lien Linkedin"><FontAwesomeIcon icon={faLinkedin} />Linkedin</a>
                  <a href="https://github.com/SandraPautonnier" target='_blank' rel="noreferrer" aria-label="Lien Github"><FontAwesomeIcon icon={faSquareGithub} />Github</a>
                  
                </div>
              </div>
            </div>
          </header>
          <main>
            <section className="hook-services">
              <h2>Des offres clé en main</h2>
              <div className="offers-container">
                {Services.map(Service => {
                  const iconMap = {
                    'faCode': faCode,
                    'faMagnifyingGlass': faMagnifyingGlass,
                    'faWrench': faWrench,
                    'faAward': faAward,
                    'faPen': faPen,
                  };
                  return (
                    <div key={Service.id} className="offer-card">
                      <FontAwesomeIcon icon={iconMap[Service.icon]} />
                      <h3>{Service.title}</h3>
                      <p className="base-text">{Service.description}</p>
                      <span>{Service.prix}</span>
                    </div>
                  );
                })}
              </div>
              <Link to="/price" aria-label="Faire une estimation de votre projet" className="btn">Faire une estimation de votre projet</Link>
            </section>
            <section>
              <h2>Pourquoi travailler avec moi ?</h2>
              <div className="me">
                <img src={MainImage} alt="Poignée de main" />
                <ul className="base-text">
                  <li><FontAwesomeIcon icon={faCheck} />  Accompagnement humain et personnalisé</li>
                  <li><FontAwesomeIcon icon={faCheck} />  Tarifs transparents et sans surprise</li>
                  <li><FontAwesomeIcon icon={faCheck} />  Expertise technique et créative</li>
                  <li><FontAwesomeIcon icon={faCheck} />  Solutions adaptées aux indépendants et associations</li>
                  <li><FontAwesomeIcon icon={faCheck} />  Approche stratégique et évolutive</li>
                </ul>
              </div>
              <p className="catch">Je ne crée pas seulement un site. <br />Je crée un outil qui soutient votre activité et votre croissance.</p>
            </section>
            <section className="hook-works">
              <h2>Quelques projets</h2>
                <Carousel>
                {HookWorks.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3).map((item) => (
                    <div className="slide-content" key={item.id}>
                      <img src={`${item.cover}`} alt={`Projet ${item.titlework}`} loading="lazy" />
                      <div className="slide-description">
                        <div>
                          <h3>{item.titlework}</h3>
                          <span className="work-language">{item.category}</span>
                        </div>
                        <Link to={`/portfolio/${item.id}`} className="btn-secondary" onClick={() => window.scrollTo(0, 0)} aria-label={`Voir le projet ${item.titlework}`}>
                          Voir le projet
                        </Link>
                      </div>
                    </div>
                ))}
              </Carousel>
              <Link to="/portfolio" onClick={handleScrollToTop} className="btn" aria-label="Voir plus de projets">Voir plus de projets</Link>
              <p className="catch">Des projets réalisés avec passion !</p>
            </section>
            <section>
              <div className="cta">
                <h2>Prêt(e) à développer votre présence en ligne ?</h2>
                <p>Discutons de votre projet gratuitement et sans engagement.</p>
                <Link to="/contact" className="btn" aria-label="Prendre rendez-vous">Prendre rendez-vous</Link>                
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home