import React from 'react';
import "./HelpPage.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import FAQ from "./FAQ/FAQ";

const HelpPage = () => {
    return (
        <div className="HelpPage">
            <Navbar />
            <FAQ />
            <Footer />
        </div>
    );
}

export default HelpPage