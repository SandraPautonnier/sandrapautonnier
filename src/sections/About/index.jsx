import React from 'react'
import AgeCalculator from "../../components/AgeCalculator";

const About = () => {
  return (
    <section>
        <h2>qui suis-je?</h2>
        <p>Je m'appelle Sandra Pautonnier, j'ai <AgeCalculator birthDate="1992-07-28" /> ans. <br />
            Étant une personne très curieuse et créative, je m'intéresse à tout et cherche toujours à comprendre comment les choses fonctionnent.
            Mon autonomie me permet de relever des défis variés et d'acquérir rapidement de nouvelles compétences.
            C'est pourquoi j'ai déjà une riche expérience dans différents domaines, ce qui fait de moi une Intégratrice Web polyvalente et innovante.
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