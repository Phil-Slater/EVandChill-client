import React from "react";
import "./Spinner.css";

const Spinner = () => {
    return (
        <div className="spinner-bg">
            <i className="fa-solid fa-snowflake loading-spinner"></i>
            <p>Fetching info...</p>
        </div>
    );
};

export default Spinner;
