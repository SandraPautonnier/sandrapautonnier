import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ToggleMode from '../../components/Mode';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <ToggleMode />
    </div>
  )
}

export default Home