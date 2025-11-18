import { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Docs from '../../assets/images/Portfolio.svg';
import Meta from "../../components/Meta";
import Works from "../../components/Works";
import BgDark from "../../assets/images/Background-image-dark.webp";
import BgLight from "../../assets/images/Background-image-light.webp";
import useThemeStore from "../../store/useThemeStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
} from "@fortawesome/free-solid-svg-icons";

const Portfolio = () => {

  return (
    <div className="portfolio"> 
        <Meta 
            title="Portfolio - Développeuse Web fullstack" 
            description="Développeuse web fullstack freelance spécialisée en React & Node. Création de sites performants, modernes et sur-mesure." 
        />
        <div className='background-color'>
            <div className="header-main">
                <header>
                    <Navbar />
                        <div className='banner'>
                            <img src={Docs} alt="Illustration de documents" />
                            <h2>Mes projets</h2>
                            <div className="card card-banner">
                                <p className='intro'>Passionnée par le web et toujours à l’écoute des besoins, je conçois des solutions sur mesure pour donner vie à chaque idée. Découvrez ici les projets qui ont enrichi mon parcours.</p>
                            </div>
                            <p>Site en cours de refonte ...</p>
                        </div>
                        <div className='card-works'>
                            <a href="http://sandrapautonnier.com">
                                <img src="" alt="" />
                                <h3></h3>
                                <span></span>
                                <span></span>
                            </a>
                        </div>                    
                </header>
                <main>
                    <Works />
                </main>
            </div>
            <Footer />
        </div>
    </div>
  )
}

export default Portfolio