import React from 'react';
import "./Settings.css";
import sections from "../../../constants/strings";
import Setting from './Setting';

const Settings = () => {
  return (
    <section className='services section-p bg-md-black' id = "services">
        <div className='container'>
            <div className='services-content'>
                <svg width = "1em" height = "1em">
                    <linearGradient id = "green-gradient" x1 = "100%" y1 = "100%" x2 = "0%" y2 = "0%">
                        <stop stopColor = "#99e55c" offset="0%" />
                        <stop stopColor = "#ede9a3" offset = "100%" />
                    </linearGradient>
                </svg>

                <div className='item-list grid text-white text-center'>
                    {
                        sections.services.map(service => {
                            return (
                                <Setting service = {service} key = {service.id} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default Settings