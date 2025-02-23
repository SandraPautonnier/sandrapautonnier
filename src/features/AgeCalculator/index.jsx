import React, { useState, useEffect } from "react";

const AgeCalculator = ({ birthDate }) => {
  const [age, setAge] = useState(0);

  useEffect(() => {
    // Fonction pour calculer l'âge
    const calculateAge = () => {
      const today = new Date();
      const birthDateObj = new Date(birthDate);
      let currentAge = today.getFullYear() - birthDateObj.getFullYear();
      const monthDifference = today.getMonth() - birthDateObj.getMonth();
      
      // Vérifie si l'anniversaire est déjà passé cette année
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
        currentAge--;
      }
      return currentAge;
    };

    // Met à jour l'âge initial
    setAge(calculateAge());

    // Met à jour chaque jour (optionnel)
    const interval = setInterval(() => {
      setAge(calculateAge());
    }, 24 * 60 * 60 * 1000); // Toutes les 24 heures

    // Nettoyage pour éviter des fuites mémoire
    return () => clearInterval(interval);
  }, [birthDate]);

  return (
    <span>
        {age}
    </span>
  );
};

export default AgeCalculator;
