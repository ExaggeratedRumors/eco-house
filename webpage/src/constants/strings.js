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
        title: "Q1",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc."
    },
    {
        id: 1,
        title: "Q2",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc."
    },
    {
        id: 2,
        title: "Q3",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc."
    },
    {
        id: 3,
        title: "Q4",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc."
    },
    {
        id: 4,
        title: "Q5",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc."
    },
    {
        id: 5,
        title: "Q6",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc."
    }
];

const sections = {services, features};

export default sections;