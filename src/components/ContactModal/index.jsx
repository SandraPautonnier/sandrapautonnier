import React, { useState } from "react";
import backgroundContact from '../../assets/images/background_contact.webp';


const ContactModal = ({ buttonText, title, buttonClassName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [confirmationMessage, setConfirmationMessage] = useState(""); // État pour le message de confirmation

  // Ouvrir/fermer la modale
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setConfirmationMessage(""); // Réinitialise le message lors de l'ouverture
  };

  // Gérer les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simuler l'envoi des données au serveur (vous pouvez ajouter votre logique ici)
    console.log("Données envoyées :", formData);

    // Réinitialiser le formulaire et afficher un message de confirmation
    setFormData({ name: "", email: "", message: "" });
    setConfirmationMessage("Votre message a bien été envoyé !");
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
      <button onClick={toggleModal} className={buttonClassName}>{buttonText}</button>

      {/* Contenu de la modale */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className="modal-content"
          style={{
            backgroundImage: `url(${backgroundContact})`,
            backgroundSize: `cover`
          }}>
            {/* Bouton pour fermer */}
            <button className="close-btn" onClick={toggleModal}>
              &times;
            </button>
            <h2>{title}</h2>

            {/* Affichage du message de confirmation */}
            {confirmationMessage ? (
              <p className="confirmation-message">{confirmationMessage}</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Nom</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit">Envoyer</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactModal;
