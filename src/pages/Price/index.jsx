import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeaderImage from '../../assets/images/image_portrait_dessin_sandra_header.webp';
import Cv from '../../assets/pdf/CV-Sandra-Pautonnier.pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin , faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import { faFileArrowDown  } from '@fortawesome/free-solid-svg-icons';
import Meta from "../../components/Meta";
import QuoteEstimator from "../../features/QuoteEstimator";


const Price = () => {

  return (
    <div className="price">
      <Meta 
        title="Sukiweb - Développeuse Web fullstack" 
        description="Développeuse web fullstack freelance spécialisée en React & Node. Création de sites performants, modernes et sur-mesure."  
      />
      <div className='background-color'>
        <div className="header-main">
          <header>
            <Navbar />
            <div></div>
          </header>
            <main>
              <QuoteEstimator />
            </main>  
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Price;