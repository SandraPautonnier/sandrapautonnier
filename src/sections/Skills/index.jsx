import React from 'react'
import skills from '../../../src/assets/content/skillsList.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faPen, faDiagramProject, faBullseye } from '@fortawesome/free-solid-svg-icons';

function Skills() {

  const iconMap = {
    'fa-code': faCode,
    'fa-pen': faPen,
    'fa-diagram-project': faDiagramProject,
    'fa-bullseye': faBullseye,
  };

  return (
    <section className='skills'>
        <h2>Mes domaines de compétences</h2>
        <div className='container-card-skills'>
          {skills.map((skill, index) => (
            <ul key={index} className='card-skills'>
              <FontAwesomeIcon icon={iconMap[skill.icon]} />
              <h3>{skill.titlecard}</h3>
              {skill.listcard.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
    </section>
  )
}

export default Skills