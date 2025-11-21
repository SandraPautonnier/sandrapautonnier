
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Docs from '../../assets/images/image_portfolio.webp';
import Meta from "../../components/Meta";
import Works from "../../components/Works";

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
                            <h2>Portfolio - Mes projets</h2>
                            <div className="card-banner">
                                <p className='intro'>Passionnée par le web, je crée des solutions sur mesure pour donner vie à vos idées. Découvrez ici les projets qui ont enrichi mon parcours.</p>
                            </div>
                        </div>                  
                </header>
                <main>
                    <section className='margin'>
                        <h2>Projets professionnels et personnels</h2>
                        <Works projectType="Projets professionnels et personnels" />
                    </section>
                    <section>
                        <h2>Projets professionnalisants</h2>
                        <Works projectType="Projets professionnalisants" />
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    </div>
  )
}

export default Portfolio