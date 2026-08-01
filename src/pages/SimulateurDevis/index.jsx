import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Meta from "../../components/Meta";
import QuoteEstimator from "../../features/QuoteEstimator";

const SimulateurDevis = () => {

  return (
    <div className="price">
      <Meta
        title="Simulateur de devis - Démonstration technique | Sukiweb"
        description="Démonstration technique : moteur de calcul multi-critères, formulaire multi-étapes à état persistant et génération de PDF côté client. Les tarifs affichés sont fictifs et ne constituent pas un devis."
      />
      <div className='background-color'>
        <div className="header-main">
          <header>
            <Navbar />
            <div></div>
          </header>
            <main>
              <div className="quote-demo-notice">
                <h1>Simulateur de devis — démonstration technique</h1>
                <p>
                  <strong>⚠️ Ceci est une démonstration technique</strong> présentée dans le cadre de mon portfolio.
                  Les tarifs affichés sont fictifs et ne constituent pas un devis.
                </p>
                <p>
                  Cette page illustre un moteur de calcul multi-critères, un formulaire multi-étapes à état
                  persistant, et une génération de PDF côté client.
                </p>
              </div>
              <QuoteEstimator />
            </main>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default SimulateurDevis;
