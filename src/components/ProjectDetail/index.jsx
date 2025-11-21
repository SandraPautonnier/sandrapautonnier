import { useParams, useNavigate } from 'react-router-dom';
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
    const project = works.find(work => work.id === parseInt(id));

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
                                <button onClick={() => navigate(-1)} className='back-button btn-main'>
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
        <div className='project-page'>
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
                            <div className='project-detail-container'>
                                <button onClick={() => navigate(-1)} className='btn'>
                                    <FontAwesomeIcon icon={faArrowLeft} /> Retour
                                </button>
                                <h2>{project.titlework}</h2>
                            </div>


                            <div className='project-detail'>
                            <img src={project.cover} alt={project.titlework} className='project-cover' />
                            
                            <div className='project-info'>
                                <div className='info-item'>
                                    <h3>Catégorie</h3>
                                    <p className='category-badge'>{project.category}</p>
                                </div>
                                
                                <div className='info-item'>
                                    <h3>Langages</h3>
                                    <div className='languages-list'>
                                        {project.language.map((lang, index) => (
                                            <span key={index} className='language-tag'>{lang}</span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className='info-item'>
                                    <h3>Outils</h3>
                                    <p>{project.tools}</p>
                                </div>
                            </div>

                            <div className='project-link'>
                                <h2>Liens</h2>
                                <div className='project-link-buttons'>
                                    <a href={project.link} target='_blank' rel='noopener noreferrer' className='btn'>
                                        Lien vers le projet
                                    </a>
                                    {project.github && (
                                    <a href={project.github} target='_blank' rel='noopener noreferrer' className='btn github-button'>
                                            <FontAwesomeIcon icon={faGithub} /> GitHub
                                    </a>
                                    )}
                                </div>
                            </div>
                            
                            <div className='project-description'>
                                <h2>À propos du projet</h2>
                                <p>{project.description}</p>
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
