import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import "./Navbar.css";
import {FaTwitter, FaSkype, FaVimeoV, FaDoorOpen, FaSignOutAlt, FaSign} from "react-icons/fa";
import {IoMdRocket} from "react-icons/io";
import {FaDoorClosed} from "react-icons/fa6";
import {GiLogging} from "react-icons/gi";
import {GoSignOut} from "react-icons/go";
import axios from "axios";

const Navbar = () => {

    const [navToggle, setNavToggle] = useState(false);
    const navHandler = () => {
        setNavToggle(toggle => !toggle);
    }

    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            window.location.reload();
            await axios.post('http://localhost:8082/api/logout');
            console.log('Logged out successfully');
        } catch (error) {

            console.error('Error logging out:', error);
        }
    };

    return (
    <nav className='navbar w-100 flex'>
        <div className='container w-100'>
            <div className='navbar-content flex fw-7'>
                <div className='brand-and-toggler flex flex-between w-100'>
                    <Link to = "/" className='navbar-brand'>ecohouse+</Link>
                    <div type = "button" className={`hamburger-menu ${navToggle ? 'hamburger-menu-change' : ""}`} onClick={navHandler}>
                        <div className='bar-top'></div>
                        <div className='bar-middle'></div>
                        <div className='bar-bottom'></div>
                    </div>
                </div>

                <div className={`navbar-collapse ${navToggle ? 'show-navbar-collapse' : ""}`}>
                    <div className='navbar-collapse-content'>
                        <ul className='navbar-nav'>
                            <li className='text-white'>
                                <Link to="/power">Power consumption</Link>
                            </li>
                            <li className='text-white'>
                                <Link to="/rooms">My rooms</Link>
                            </li>
                            <li className='text-white'>
                                <Link to="/settings">Settings</Link>
                            </li>
                            <li className='text-white'>
                                <Link to="/help">Help</Link>
                            </li>
                            {localStorage.getItem('token')  ? (
                            <li className='text-white'>
                                <Link onClick={handleLogout} to="/"><GoSignOut/> Log out</Link>
                            </li>
                            ) : ( "" )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar