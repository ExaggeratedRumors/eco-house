import './PowerPage.css';

import React from "react";
import Navbar from "../Navbar/Navbar";
import LineChart from "./LineChart/LineChart";
import Footer from "../Footer/Footer";

function PowerPage() {
    const data = [15, 10, 12, 20, 8, 14]

    return (
        <div className="PowerPage">
            <Navbar />
            <LineChart data={data} />
            <Footer />
        </div>
    );
}

export default PowerPage;
