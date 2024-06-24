import './PowerPage.css';

import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import LineChart from "./LineChart/LineChart";
import Footer from "../Footer/Footer";
import axios from "axios";

const PowerPage = () => {
    const [ownerData, setOwnerData] = useState(null);
    let token = localStorage.getItem('token');

    /** Functions **/
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        console.log("Token:" + token)
        try {
            const id = localStorage.getItem('id');
            const response = await axios.get('http://localhost:8082/owners/' + id, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setOwnerData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!ownerData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="PowerPage">
            <Navbar />
            {ownerData && ownerData.houses && ownerData.houses.map((house) => {
                return <LineChart houseId={house.house_id} houseName={house.name} />
            })}
            <Footer />
        </div>
    );
}

export default PowerPage;
