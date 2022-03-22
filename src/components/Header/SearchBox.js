import React from "react";
import { useState } from "react";
import ReactDropdown from "../common/ReactDropdown";

const SearchBox = () => {
    const [searchType, setSearchType] = useState("zip");
    const dropdownOptions = [
        {
            value: "current",
            text: "My Location",
            icon: "fa-solid fa-location-arrow",
        },
        {
            value: "zip",
            text: "Zip Code",
            icon: "fa-solid fa-map-location-dot",
        },
        {
            value: "city",
            text: "City/State",
            icon: "fa-solid fa-city",
        },
    ];

    const handleChange = (e) => {
        setSearchType(e.target.value);
    };
    return (
        <div className="header-search">
            <ReactDropdown options={dropdownOptions} onChange={handleChange} />
        </div>
    );
};

export default SearchBox;
