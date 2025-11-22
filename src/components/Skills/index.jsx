import React from 'react'
import skills from '../../assets/content/skillsList.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faPen, faDiagramProject, faBullseye, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
            <div key={index} className='card skills'>
              <div className='triangle1'></div>
              <div></div>
              <FontAwesomeIcon icon={iconMap[skill.icon]} />
              <h3>{skill.titlecard}</h3>
              <div className='li-skills'>{skill.listcard.map((item, idx) => (
                <li key={idx}><FontAwesomeIcon icon={faArrowRight} /> {item}</li>
              ))}</div>
            </div>
          ))}
        </div>
    </section>
  )
}

export default Skills
