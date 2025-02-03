import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser'; // Importation d'EmailJS

const ContactModal = ({ buttonText, title, buttonClassName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(""); // État pour le message de confirmation
  const [isSending, setIsSending] = useState(false);
  // États séparés pour chaque champ du formulaire
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");

  // Ouvrir/fermer la modale
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setConfirmationMessage(""); // Réinitialise le message lors de l'ouverture
  };

  // Initialiser EmailJS 
  useEffect(() => {
    emailjs.init("0GoSVF1YIRg3i22PD");
  }, []);

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceID = "service_lmmjb3d";
    const templateID = "template_npfqhdf";

    // Préparer l'objet contenant les données du formulaire
    const templateParams = {
      from_name: fromName,
      from_email: fromEmail,
      message: message,
    };

    // Envoyer l'e-mail via EmailJS
    emailjs.send(serviceID, templateID, templateParams)
      .then((response) => {
        console.log("Email envoyé avec succès !", response);
        setConfirmationMessage("Votre message a bien été envoyé !");
        // Réinitialiser les champs du formulaire
        setFromName("");
        setFromEmail("");
        setMessage("");
        setIsSending(false);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'email", error);
        setConfirmationMessage("Une erreur s'est produite. Veuillez réessayer plus tard.");
        setIsSending(false);
      });
  };

  // Fonction pour fermer la modale en cliquant à l'extérieur
  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      toggleModal();
    }
  };

  return (
    <div>
      {/* Bouton pour ouvrir la modale */}
      <button onClick={toggleModal} className={buttonClassName}>
        {buttonText}
      </button>

      {/* Contenu de la modale */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div
            className="modal-content"
          >
            {/* Bouton pour fermer */}
            <button className="close-btn" id="close-btn" onClick={toggleModal}>
              &times;
            </button>
            <h2>{title}</h2>

            {/* Affichage du message de confirmation */}
            {confirmationMessage ? (
              <p className="confirmation-message">{confirmationMessage}</p>
            ) : (
              <form id="form" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="from_email">Votre e-mail</label>
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="from_name">Votre nom / Objet</label>
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
                <div>
                  <label htmlFor="message">Votre message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={2000}
                    required
                  ></textarea>
                </div>
                <button className="btn-submit-form" type="submit">
                  {isSending ? "Envoi en cours..." : "Envoyer"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactModal;
