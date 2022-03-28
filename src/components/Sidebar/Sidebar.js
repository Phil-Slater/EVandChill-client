import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Sidebar.css";
import UserlessLinks from "./UserlessLinks";
import UserLinks from "./UserLinks";

const Sidebar = () => {
    const isMenuActive = useSelector((state) => state.display.isMenuActive);
    const user = useSelector((state) => state.auth.user);

    return (
        <div className={`sidebar-menu ${isMenuActive ? "active" : ""}`}>
            <h1>EV & Chill</h1>
            <Link to="/">Home</Link>
            <Link to="/stations">Stations Near Me</Link>
            {user.username ? <UserLinks user={user} /> : <UserlessLinks />}
            <hr />
            <Link to="/settings" className="sidebar-settings">
                Settings
            </Link>

            <div className="sidebar-footer">
                <p>Created March 2022</p>
                <p>
                    <Link to="/about">About Us</Link>
                </p>
            </div>
        </div>
    );
};

export default Sidebar;
