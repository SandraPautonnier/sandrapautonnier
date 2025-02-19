import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactModal from "../../components/ContactModal";
import Skills from '../Sections/Skills';

const Profile = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

  return (
    <div className='background'>
        <div className="header-main">
            <header>
                <Navbar openModal={openModal}/>
            </header>
            <main>
                <Skills />
            </main>
        </div>
        <Footer openModal={openModal}/>
        <ContactModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            title="Contactez-moi" 
        />
    </div>
  )
}

export default Profile