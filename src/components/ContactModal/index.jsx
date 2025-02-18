// ContactModal.jsx
import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const ContactModal = ({ isOpen, onClose, title }) => {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [fromName, setFromName] = useState("");
  const [fromObject, setFromObject] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");

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

    const templateParams = {
      from_name: fromName,
      from_email: fromEmail,
      message: message,
      from_object: fromObject
    };

    emailjs.send(serviceID, templateID, templateParams)
      .then((response) => {
        console.log("Email envoyé avec succès !", response);
        setConfirmationMessage("Votre message a bien été envoyé !");
        setFromName("");
        setFromObject("");
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

  // Fermer la modale si l'utilisateur clique en dehors du contenu
  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  // Ne rien afficher si la modale n'est pas ouverte
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Bouton de fermeture */}
        <button className="close-btn" id="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>
        {confirmationMessage ? (
          <p className="confirmation-message">{confirmationMessage}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
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
            <div>
              <label htmlFor="from_name">Name</label>
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
            <div>
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
            <button className="btn-submit-form" type="submit">
              {isSending ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
