import React from 'react'
import AgeCalculator from "../../components/AgeCalculator";

const About = () => {
  return (
    <section className='about'id='profil'>
        <h2>Qui suis-je?</h2>
        <p>Je m'appelle Sandra Pautonnier, j'ai <AgeCalculator birthDate="1992-07-28" /> ans. <br />
        Je viens de terminer ma formation d’Intégratrice Web chez OpenClassrooms. Curieuse et créative, je m’intéresse à de nombreux domaines et cherche constamment à comprendre comment les choses fonctionnent. Mon autonomie me permet de relever des défis variés et d’acquérir rapidement de nouvelles compétences. Grâce à cela, j’ai une riche expérience dans différents domaines, ce qui fait de moi une Intégratrice Web polyvalente et innovante.
        </p>
        <div className='tag-btn'>
          <ul className='tags'>
            <li className='tag'>#curieuse</li>
            <li className='tag'>#créative</li>
            <li className='tag'>#autonome</li>
          </ul>
        </div>
    </section>
  )
}

export default About