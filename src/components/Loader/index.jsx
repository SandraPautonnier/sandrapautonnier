import { useEffect, useRef } from 'react';
import '../../sass/layout/_loader.scss';

const LoadingScreen = () => {
  const screenRef = useRef(null);

  useEffect(() => {
    const handleLoad = () => {
      if (screenRef.current) {
        screenRef.current.classList.add('fondu-out');
      }
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="loading-screen" ref={screenRef}>
      <div className="loader"></div>
      <p>Chargement...</p>
    </div>
  );
};

export default LoadingScreen;

