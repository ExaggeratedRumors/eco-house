import React from 'react';
import "./Header.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Header = () => {
  return (
    <header className='header flex flex-center flex-column'>
        <div className='container'>
            <div className='header-content text-center flex flex-column'>
                <h1 className='header-title'>ecohouse+</h1>
                <p className='text-lead'>Monitor the energy consumption of devices.</p>
            </div>
        </div>
    </header>
  )
}

export default Header