import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
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