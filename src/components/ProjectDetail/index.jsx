import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import works from '../../assets/content/worksList.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Meta from '../Meta';
import '../../sass/components/_projectDetail.scss';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isExiting, setIsExiting] = useState(false);
    const project = works.find(work => work.id === parseInt(id));

    const handleGoBack = () => {
        setIsExiting(true);
        setTimeout(() => {
            // Récupérer la position sauvegardée
            const scrollPosition = localStorage.getItem('portfolioScrollPosition');
            navigate(-1);
            // Restaurer la position après la navigation
            setTimeout(() => {
                if (scrollPosition) {
                    window.scrollTo(0, parseInt(scrollPosition));
                    localStorage.removeItem('portfolioScrollPosition');
                }
            }, 100);
        }, 300);
    };

    if (!project) {
        return (
            <div className='project-page'>
                <Meta 
                    title="Projet non trouvé" 
                    description="La page du projet demandée n'existe pas."
                />
                <div className='background-color'>
                    <div className='header-main'>
                        <header>
                            <Navbar />
                        </header>
                        <main>
                            <section className='project-detail-container'>
                                <button onClick={handleGoBack} className='back-button btn-main'>
                                    <FontAwesomeIcon icon={faArrowLeft} /> Retour
                                </button>
                                <p>Projet non trouvé</p>
                            </section>
                        </main>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }

    return (
        <div className={`project-page ${isExiting ? 'exiting' : ''}`}>
            <Meta 
                title={`${project.titlework} - Projet`}
                description={project.description}
            />
            <div className='background-color'>
                <div className='header-main'>
                    <header>
                        <Navbar />
                    </header>
                    <main>
                        <section className='project-container'>
                            <div className='project-header'>
                                <button onClick={handleGoBack} className='btn'>
                                    <FontAwesomeIcon icon={faArrowLeft} /> Retour
                                </button>
                                <h2>{project.titlework}</h2>
                                <p className='project-date'>{project.date}</p>
                            </div>

                            <div className='project-meta'>
                                <p className='project-category'>{project.category}</p>
                                
                                <div className='project-langs'>
                                    <strong>Languages :</strong>
                                    <div className='languages-list'>
                                        {project.language.map((lang, index) => (
                                            <span key={index} className='language-tag'>{lang}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className='project-tools'>
                                    <strong>Outils :</strong>
                                    <p>{project.tools}</p>
                                </div>
                            </div>

                            <div className='project-detail'>
                                <img src={project.cover} alt={project.titlework} className='project-cover' />
                                
                                <div className='project-section'>
                                    <h3>Contexte</h3>
                                    <p>{project.context}</p>
                                </div>

                                <div className='project-section'>
                                    <h3>Réalisations</h3>
                                    <ul className='todo-list'>
                                        {project.todo.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className='project-section'>
                                    <h3>Conclusion</h3>
                                    <p>{project.conclusion}</p>
                                </div>

                                <div className='project-links'>
                                    <h3>Liens</h3>
                                    <div className='project-link-buttons'>
                                        {project.link && (
                                            <a href={project.link} target='_blank' rel='noopener noreferrer' className='btn'>
                                                Lien vers le projet
                                            </a>
                                        )}
                                        {project.github && (
                                            <a href={project.github} target='_blank' rel='noopener noreferrer' className='btn github-button'>
                                                <FontAwesomeIcon icon={faGithub} /> GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default ProjectDetail;
