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

    // Modifier ou créer la meta og:image
    if (image) {
      let metaImage = document.querySelector('meta[property="og:image"]');
      if (metaImage) {
        metaImage.setAttribute('content', image);
      } else {
        metaImage = document.createElement('meta');
        metaImage.setAttribute('property', 'og:image');
        metaImage.content = image;
        document.head.appendChild(metaImage);
      }
    }

    // Modifier ou créer le favicon
    if (favicon) {
      let linkFavicon = document.querySelector('link[rel="icon"]');
      if (linkFavicon) {
        linkFavicon.setAttribute('href', favicon);
      } else {
        linkFavicon = document.createElement('link');
        linkFavicon.rel = 'icon';
        linkFavicon.href = favicon;
        document.head.appendChild(linkFavicon);
      }
    }
  }, [title, description, image, favicon]);

  return null; // Ne rend rien
}

export default Meta;
