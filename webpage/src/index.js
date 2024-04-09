import './index.css';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";
import SettingsPage from "./components/SettingsPage/SettingsPage";
import RoomsPage from "./components/RoomsPage/RoomsPage";
import PowerPage from "./components/PowerPage/PowerPage";
import HelpPage from "./components/HelpPage/HelpPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<MainPage />}></Route>
            <Route path = "/rooms" element = {<RoomsPage />}></Route>
            <Route path = "/settings" element = {<SettingsPage/>}></Route>
            <Route path = "/power" element = {<PowerPage />}></Route>
            <Route path = "/help" element={<HelpPage />}></Route>
        </Routes>
    </BrowserRouter>
);


reportWebVitals();
