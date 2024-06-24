import {FaEdit, FaSun} from "react-icons/fa";
import {BiDollarCircle} from "react-icons/bi";
import {ImQuestion} from "react-icons/im";
import {FaComputer, FaHouse} from "react-icons/fa6";

const gradient = "url(#green-gradient)" ;

const services = [
    {
        id: 1,
        icon: <FaHouse style = {{ fill: gradient }} />,
        title: "Rooms",
        text: "Add, remove and check your rooms"
    },
    {
        id: 2,
        icon: <FaComputer style = {{ fill: gradient }} />,
        title: "Devices",
        text: "Add, remove and check your devices"
    },
    {
        id: 3,
        icon: <FaSun style = {{ fill: gradient }} />,
        title: "Solar panels",
        text: "Check solar panels status"
    },
    {
        id: 4,
        icon: <BiDollarCircle style = {{ fill: gradient }} />,
        title: "Bills",
        text: "Check today's bills"
    },
    {
        id: 5,
        icon: <ImQuestion style = {{ fill: gradient }} />,
        title: "FAQ",
        text: "Check often ask questions"
    },
    {
        id: 6,
        icon: <FaEdit style = {{ fill: gradient }} />,
        title: "User settings",
        text: "Change password, address or name"
    }
];

const features = [
    {
        id: 0,
        title: "What are the hours of the daily tariff?",
        text: "The daily tariff is in force from 6am to 10pm."
    },
    {
        id: 1,
        title: "At what times do the solar panels work?",
        text: "The solar panels operate according to the manufacturers' data marked for the whole year. We do not distinguish between the time of day when calculating the energy generation of solar panels."
    },
    {
        id: 2,
        title: "How many dwellings, rooms or units can I save?",
        text: "There is no upper limit for dwellings, rooms and units."
    },
    {
        id: 3,
        title: "Can I have other schedules for the operation of equipment other than 24-hour?",
        text: "No, there is no such possibility."
    },
    {
        id: 4,
        title: "How do I change my account password?",
        text: "Contact the site administrator."
    },
    {
        id: 5,
        title: "What unit applies when stating energy consumption?",
        text: "When stating energy consumption, the unit of kWh applies."
    }
];

const sections = {services, features};

export default sections;