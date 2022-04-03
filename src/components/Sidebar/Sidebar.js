import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postStationsByLocation } from "../../util/axiosConfig";

import "./Sidebar.css";
import UserlessLinks from "./UserlessLinks";
import UserLinks from "./UserLinks";

const Sidebar = () => {
    const navigate = useNavigate();
    const isMenuActive = useSelector((state) => state.display.isMenuActive);
    const user = useSelector((state) => state.auth.user);

    const handleNearMeClick = async () => {
        const locationResults = await postStationsByLocation();
        if (locationResults && locationResults.success) {
            navigate("/results");
        }
    };
    return (
        <div className={`sidebar-menu ${isMenuActive ? "active" : ""}`}>
            <div className="sidebar-menu-inner">
                <h1>EV & Chill</h1>
                <Link to="/">Home</Link>
                <p onClick={handleNearMeClick} className="sidebar-near">
                    Stations Near Me
                </p>
                {user.username ? <UserLinks user={user} /> : <UserlessLinks />}
                <hr />

                <div className="sidebar-footer">
                    <p>Created March 2022</p>
                    <p>
                        <Link to="/about">About Us</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
