
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Docs from '../../assets/images/image_portfolio.webp';
import Meta from "../../components/Meta";
import Works from "../../components/Works";

const Portfolio = () => {

  return (
    <div className="portfolio"> 
        <Meta 
            title="Sukiweb - Portfolio de projets web" 
            description="Développeuse web spécialisée en création de sites performants, modernes et sur-mesure. Découvrez mes projets professionnels et personnels ainsi que mes réalisations professionnalisantes." 
        />
        <div className='background-color'>
            <div className="header-main">
                <header>
                    <Navbar />
                        <div className='banner' role="region" aria-label="Présentation - Portfolio">
                            <img src={Docs} alt="Illustration de documents" loading="lazy" />
                            <h1>Portfolio - Mes projets</h1>
                            <div className="card-banner">
                                <p className='base-text'>Passionnée par le web, je crée des solutions sur mesure pour donner vie à vos idées. Découvrez ici les projets qui ont enrichi mon parcours.</p>
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