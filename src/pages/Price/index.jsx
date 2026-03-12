import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Meta from "../../components/Meta";
import QuoteEstimator from "../../features/QuoteEstimator";


const Price = () => {

  return (
    <div className="price">
      <Meta 
        title="Sukiweb - Devis et estimation de projet web" 
        description="Développeuse web freelance spécialisée en création de sites performants, modernes et sur-mesure. Obtenez une estimation claire et transparente pour votre projet web. Accompagnement humain, expertise technique et créative."  
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