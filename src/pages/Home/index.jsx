import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ToggleMode from '../../components/Mode';
import Sandra1 from '../../assets/images/sandra1.png';
import About from '../../sections/About';

const Home = () => {
  return (
    <div>
      <header>
        <Navbar/>
        <div className='header-banner'>
          <img src={Sandra1} alt="Sandra" />
          <h1>Sandra Pautonnier</h1>
          <p>Developpeuse Intégratrice Web</p>
          <div className='all-mode'>
            <ToggleMode />
            <button></button>
          </div>
        </div>
      </header>
      <main>
        <About />
      </main>
      <Footer/>
    </div>
  )
}

export default Home