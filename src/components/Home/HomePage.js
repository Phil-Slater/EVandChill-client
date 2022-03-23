import React from "react";

import logoLg from "./evandchill-HI.png";

import "./HomePage.css";
const HomePage = () => {
    return (
        <div>
            <h1>EV and Chill</h1>
            <img src={logoLg} alt="EV & Chill Logo" className="hp-logo" />
        </div>
    );
};

export default HomePage;
