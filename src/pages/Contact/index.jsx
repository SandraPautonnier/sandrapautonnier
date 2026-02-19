import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { faMapLocationDot, faEnvelope, faArrowRight, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import ImageContact from "../../assets/images/image_contact.webp";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Meta from "../../components/Meta";
import "../../sass/pages/_contact.scss";

const Contact = () => {
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [fromName, setFromName] = useState("");
    const [fromObject, setFromObject] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        emailjs.init("0GoSVF1YIRg3i22PD");
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        const serviceID = "service_dgr4ts3";
        const templateID = "template_npfqhdf";

        const templateParams = {
            from_name: fromName,
            from_email: fromEmail,
            message: message,
            from_object: fromObject,
        };

        emailjs
            .send(serviceID, templateID, templateParams)
            .then(() => {
                setConfirmationMessage("✅ Votre message a bien été envoyé !");
                setFromName("");
                setFromObject("");
                setFromEmail("");
                setMessage("");
            })
            .catch(() => {
                setConfirmationMessage(
                    "❌ Une erreur s'est produite. Veuillez réessayer plus tard."
                );
            })
            .finally(() => setIsSending(false));
    };

    return (
        <div className="contact">
            <Meta
                title="Contact - Développeuse Web fullstack"
                description="Contactez Sandra Pautonnier, développeuse web fullstack spécialisée en React & Node. Création de sites performants, modernes et sur-mesure."
            />
            <div className='background-color'>
                <div className="header-main">
                    <header>
                        <Navbar />
                        <div className='banner'>
                            <img src={ImageContact} alt="Photo de Sandra" />
                             <h2>Contact - Contactez-moi</h2>
                             <p>Une question, une idée, un projet : parlons-en !</p>
                        </div>
                    </header>
                    <main className="contact-container">
                        <section className="contact-section margin margin-desktop">
                            <h2>A l'aide de mon formulaire ou par e-mail</h2>                           
                            <div className="contact-wrapper">
                                {/* Colonne gauche : Formulaire */}
                                <div className="contact-column contact-form-column">
                                    {confirmationMessage ? (
                                        <p className="confirmation-message">{confirmationMessage}</p>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="contact-form">
                                            <div className="form-group">
                                                <label htmlFor="from_name">Nom</label>
                                                <input
                                                    type="text"
                                                    id="from_name"
                                                    name="from_name"
                                                    value={fromName}
                                                    onChange={(e) => setFromName(e.target.value)}
                                                    maxLength={200}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="from_email">E-mail</label>
                                                <input
                                                    type="email"
                                                    id="from_email"
                                                    name="from_email"
                                                    value={fromEmail}
                                                    onChange={(e) => setFromEmail(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="from_object">Objet</label>
                                                <input
                                                    type="text"
                                                    id="from_object"
                                                    name="from_object"
                                                    value={fromObject}
                                                    onChange={(e) => setFromObject(e.target.value)}
                                                    maxLength={200}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="message">Message</label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    maxLength={2000}
                                                    required
                                                ></textarea>
                                            </div>

                                            <button className="btn" type="submit" disabled={isSending}>
                                                {isSending ? "Envoi en cours..." : "Envoyer"}
                                            </button>
                                        </form>
                                    )}
                                </div>

                                {/* Colonne droite : Informations de contact */}
                                <div className="contact-column contact-info">

                                    <div className="contact-info-item">
                                        <FontAwesomeIcon icon={faMapLocationDot} className="contact-icon" />
                                        <div className="contact-info-content">
                                            <h3>Localisation</h3>
                                            <ul>
                                                <li><FontAwesomeIcon icon={faArrowRight} className="loc-icon" />En France à distance</li>
                                                <li><FontAwesomeIcon icon={faArrowRight} className="loc-icon" />À Le Mans et aux alentours en présentiel</li>
                                            </ul>
                                        </div>
                                    </div>                                        

                                    <div className="contact-info-item">
                                        <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                                        <div className="contact-info-content">
                                            <h3>Email</h3>
                                            <a href="mailto:contact@sandrapautonnier.com" aria-label="Envoyer un email à Sandra">
                                                contact@sandrapautonnier.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="contact-info-item">
                                        <FontAwesomeIcon icon={faShareNodes} className="contact-icon" />
                                        <div className="social">
                                        <h3>Réseaux sociaux</h3>
                                            <div className="social-links">
                                                <a 
                                                    href="https://www.linkedin.com/in/sandra-pautonnier/" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    aria-label="LinkedIn"
                                                >
                                                    <FontAwesomeIcon icon={faLinkedin} />
                                                </a>
                                                <a 
                                                    href="https://github.com/sandrapautonnier" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    aria-label="GitHub"
                                                >
                                                    <FontAwesomeIcon icon={faSquareGithub} />
                                                </a>
                                            </div>
                                        </div>

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
}

export default Contact;