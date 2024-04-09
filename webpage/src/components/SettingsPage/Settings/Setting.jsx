import React from 'react';
import {BsArrowRightCircle} from "react-icons/bs";
import "./Settings.css";

const Setting = ({service}) => {
    return (
        <div className='item bg-dark translate-effect'>
            <div className='item-icon'>{service.icon}</div>
            <h4 className='item-title fs-25'>{service.title}</h4>
            <p className='fs-21 text'>{service.text}</p>
            <a href="/public" className='item-link text-grey'><BsArrowRightCircle size={30}/></a>
        </div>
    )
}

export default Setting