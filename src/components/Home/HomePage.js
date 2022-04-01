import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../store/actions/actionCreators";

import logoLg from "./evandchill-HI.png";

import "./HomePage.css";
const HomePage = () => {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.auth.user.username);

    const handleMenuClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        dispatch(toggleMenu());
    };

    return (
        <div className="home">
            <div className="home-intro">
                <div className="home-logo">
                    <img
                        src={logoLg}
                        alt="EV & Chill Logo"
                        className="hp-logo"
                    />
                </div>
                <div className="home-info">
                    <h1>Welcome to EV & Chill!</h1>
                    <h4>
                        Your One Stop Spot To Find Charging Stations and Things
                        to Do While Waiting!
                    </h4>
                </div>
            </div>
            <div className="home-content">
                <h2>Charging Your Electric Vehicle Can Take Hours...</h2>
                <h4>...so what can you do?</h4>
                <p>
                    With <b>EV & Chill</b>, not only do we help you find EV
                    Charging Stations near you and at your destination, we
                    connect you with food and entertainment options while
                    waiting for charging to complete!
                </p>
                <h3>How to Use this Site</h3>
                <p>
                    Use the search box at the top of the page to search by zip
                    code, city and state, or even your current location! To save
                    stations to your history, an account is required (a guest
                    account is available to preview account features).
                </p>
                {!username && (
                    <button className="home-menu" onClick={handleMenuClick}>
                        Open Menu to Log In
                    </button>
                )}
            </div>
        </div>
    );
};

export default HomePage;
