import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { InlineWidget } from "react-calendly";

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
                            <h2>Contactez-moi</h2>
                            <p>Vous avez un projet de site web ou besoin d’améliorer votre visibilité ? Parlons-en !</p>
                        </div>
                    </header>
                    <main className="contact-container">
                        <section className="contact-section margin margin-desktop">
                            <h2>Discutons de votre projet</h2>
                            <div className="contact-wrapper">
                                <div className="contact-column">
                                    <div className="calendly-card">
                                        <h3 className="rdv-title">Prendre un rendez-vous</h3>
                                        <p className="rdv-subtitle">
                                        Un échange par téléphone gratuit de 30 minutes pour comprendre vos besoins et voir comment je peux vous accompagner.
                                        </p>

                                        <InlineWidget
                                        url="https://calendly.com/sandrapautonnier/rdv?hide_event_type_details=1&hide_gdpr_banner=1"
                                        styles={{
                                            height: "700px",
                                            width: "100%",
                                        }}
                                        />
                                    </div>
                                </div>
                                <div className="contact-column contact-form-column">
                                    <h2>Vous préférez m'écrire ?</h2>
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