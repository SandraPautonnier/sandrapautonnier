import React from 'react'
import AgeCalculator from "../../../features/AgeCalculator";

const About = () => {
  return (
    <section className='about'>
        <h2>Qui suis-je?</h2>
        <p>Je m'appelle Sandra Pautonnier, j'ai <AgeCalculator birthDate="1992-07-28" /> ans. <br />
        
        </p>
        <div className='tag-btn'>
          <ul className='tags'>
            <li className='tag'>#curieuse</li>
            <li className='tag'>#créative</li>
            <li className='tag'>#autonome</li>
          </ul>
          <div className='formation'>
            <h3>Formée chez Openclassrooms</h3>
            <p>Intégrateur Web</p>
            <p>Certification Qualiopi</p>
          </div>
        </div>
    </section>
  )
}

export default About