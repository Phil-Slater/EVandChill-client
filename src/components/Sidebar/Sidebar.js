import React from "react";
import { useSelector } from "react-redux";

import "./Sidebar.css";

const Sidebar = () => {
    const isMenuActive = useSelector((state) => state.display.isMenuActive);
    return (
        <div className={`sidebar-menu ${isMenuActive ? "active" : ""}`}>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
        </div>
    );
};

export default Sidebar;
