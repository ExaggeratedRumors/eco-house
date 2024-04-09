import React from 'react';
import "./Footer.css";

const Footer = () => {
    let date = new Date();
    return (<footer className='footer bg-black flex flex-center' id="footer">
            <div className='container flex flex-center w-100'>
                    <span className='text'>&copy; {date.getFullYear().toString()} Politechnika Łódzka</span>
            </div>
        </footer>)
}

export default Footer
