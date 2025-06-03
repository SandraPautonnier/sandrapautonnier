import { useEffect } from 'react';

function Meta({ title, description, image, favicon }) {
  useEffect(() => {
    // Modifier le titre
    if (title) {
      document.title = title;
    }

    // Modifier ou créer la meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        metaDescription.content = description;
        document.head.appendChild(metaDescription);
      }
    }
  }, [title, description]);

  return null; // Ne rend rien
}

export default Meta;
