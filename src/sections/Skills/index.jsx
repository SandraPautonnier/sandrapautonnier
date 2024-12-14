import React from 'react'
import { useParams } from 'react-router-dom'
import skills from '../../../src/assets/content/skillsList.json'

function Skills() {

  const {id} = useParams();

  return (
    <section className='skills'>
        <h2>Mes domaines de compétences</h2>
        <div className='container-card-skills'>
          {skills.map((skill, index) => (
          <div key={index} className='card-skills'>
            <ul>
              <h3>{skill.titlecard}</h3>
              {skill.listcard.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          ))}
        </div>
    </section>
  )
}

export default Skills