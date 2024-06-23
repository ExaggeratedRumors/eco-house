import './MainPage.css';

import React from "react";
import Navbar from "../Navbar/Navbar";
import Header from "./Header/Header";
import Registration from "./Registration/Registration";
import Footer from "../Footer/Footer";

function MainPage() {
    return (
        <div className="MainPage">
            <Navbar />
            <div className="grid-content">
                <div className="left-content">
                    <Header/>
                </div>
                {localStorage.getItem('token') ? ("") : (
                    <div className="right-content">
                        <Registration/>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
}

export default MainPage;
