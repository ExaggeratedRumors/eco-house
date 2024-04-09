import './SettingsPage.css';

import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Settings from "./Settings/Settings";

function SettingsPage() {
    return (
        <div className="SettingsPage">
            <Navbar />
            <Settings />
            <Footer />
        </div>
    );
}

export default SettingsPage;
