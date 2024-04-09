import './RoomsPage.css';

import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Rooms from "./Rooms/Rooms";

function RoomsPage() {
    return (
        <div className="RoomsPage">
            <Navbar />
            <Rooms />
            <Footer />
        </div>
    );
}

export default RoomsPage;
