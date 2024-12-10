import React from 'react'
import { CardSkills } from '../../components/CardSkills'

function Skills() {
  return (
    <section className='skills'>
        <h2>Mes domaines de compétences</h2>
        <div className='container-card-skills'>
            <CardSkills/>
            <CardSkills/>
            <CardSkills/>
        </div>
    </section>
  )
}

export default Skills