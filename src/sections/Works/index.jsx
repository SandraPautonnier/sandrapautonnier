import React from 'react'
import { Link } from 'react-router-dom';
import workslist from "../../assets/content/worksList.json";

const Works = () => {

  

  return (
    <section>
        <h2>Mes projets</h2>
        <div className='container-card-works'>
          {workslist.map(works => (
            <div className='card-works' key={works.id}>
              <Link to={works.link}>
                <img src={`${works.cover}`} alt={`${works.description}`} />
                <h3>{works.titlework}</h3>
                <p>{works.description}</p>
              </Link>
            </div>
          ))}
        </div>
        
    </section>
  )
}

export default Works