import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Meta from "../../components/Meta";
import ImageProfile from '../../assets/images/image_profil.webp';
import Coupe from '../../assets/images/coupe.svg';
import technicalSkills from '../../assets/content/technicalSkills.json';
import useThemeStore from "../../store/useThemeStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {

    const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="profile">
        <Meta 
            title="Profil - Développeuse Web fullstack" 
            description="Développeuse web fullstack freelance spécialisée en React & Node. Création de sites performants, modernes et sur-mesure." 
        />
        <div className='background-color'>
            <div className="header-main">
                <header>
                    <Navbar />
                    <div className='banner'>
                        <img src={ImageProfile} alt="Photo de Sandra" />
                        <h2>A propos - Profil</h2>
                        <div className="card-banner">
                        <p className='intro'>Développeuse web fullstack, je conçois des applications modernes centrées utilisateur avec React, Node.js et MongoDB.</p>
                        </div>
                    </div>
                </header>
                <main>
                    <section className='margin'>
                        <h2>Mes compétences techniques</h2>
                        <div className='technical-skills-grid'>
                            {technicalSkills.map((skillCategory) => (
                                <div key={skillCategory.id} className='skill-card'>
                                    <h4>{skillCategory.category}</h4>
                                    <ul className='skill-list'>
                                        {skillCategory.skills.map((skill, index) => (
                                            <li key={index}>
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                                <span>{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <p className="catch">"Oui je m'interesse à tout, mais ce que je sais surtout faire c'est analyser les besoins <br /> et exploiter les outils adaptés à la situation en toute cohérence. <br />Chaque projet est une passion !"</p>
                    </section>
                    <section>
                        <h2>Mon parcours</h2>
                        <div className='container-mobile'>
                            <div className="card insert">
                                <span>2008-2010</span>
                                <div className="center">
                                    <h3>BEP Métiers de la Mode</h3>
                                </div>
                                </div>  
                            <div className="card insert">
                                <span>2012-2014</span>
                                <div className="center">
                                    <h3>BAC PRO Commerce</h3>
                                </div>
                                </div>
                            <div className="card insert">
                                <span>2014-2016</span>
                                <div className="center">
                                    <h3>Vendeuse Prêt-à-porter</h3>
                                    <p>Noz - Sergent Major</p>
                                </div></div>
                            <div className="card insert">
                                <span>2016-2017</span>
                                <div className="center">
                                    <h3>Chef de projet évenementiel</h3>
                                    <p>Service civique : Mission autonome de A à Z</p>
                                </div></div>
                            <div className="card insert">
                                <span>2021-2024</span>
                                <div className="center">
                                    <h3>Chargé de projets</h3>
                                    <p>Enedis</p>
                                </div></div>
                            <div className="card insert">
                                <span>2024-2025</span>
                                <div className="center">
                                    <h3>Titre RNCP Développeur informatique</h3>
                                </div></div>
                            <div className="card insert">
                                <span>2025-auj.</span>
                                <div className="center">
                                    <h3>Développeuse web full stack</h3>
                                    <p>Freelance</p>
                                </div></div>
                        </div>
                    </section>
                    <section className="success">
                        <h2>Mes réussites</h2>
                        <div className="container-img-success">
                            <img src={Coupe} alt="Coupe de réussite" />
                            <ul className="container-success">
                                <li><span className="bold">2010 :</span> Dans le domaine des Métiers de la Mode, j'ai été médaillée d'argent au concours départementale du Meilleur Apprenti de France.</li>
                                <li><span className="bold">2017 :</span> Lors de mon service civique, j'ai organisé un séminaire de A à Z avec 5 établissements scolaires et des associations sur les thèmes du harcèlement scolaire et du décrochage scolaire.</li>
                                <li><span className="bold">2021 :</span> Lors d'un évènement caritatif sur ma chaîne Twitch, j'ai récolté 1477€ pour l'association Endofrance.</li>
                                <li><span className="bold">2023 :</span> Chez Enedis, j'ai été l'interlocutrice et référente de l'ACO (Automobile Club de l'Ouest) pour le centenaire des 24h du Mans (Bornes fixes).</li>
                            </ul>
                        </div>
                    </section>
                </main>
            </div>
            <Link to="/portfolio" className="btn dim">Découvrez mes réalisations</Link>
            <Footer />
        </div>
    </div>
  )
}

export default Profile