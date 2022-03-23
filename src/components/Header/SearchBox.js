import React from "react";
import { useState } from "react";
import ReactDropdown from "../common/ReactDropdown";

const SearchBox = () => {
    const [searchType, setSearchType] = useState(null);
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
        console.log(e);
        setSearchType(e.target.value);
    };
    return (
        <div className="header-search">
            <ReactDropdown options={dropdownOptions} onChange={handleChange} />
            <div className="header-search-box">
                {["zip", "city"].includes(searchType) && (
                    <input
                        placeholder={`${searchType[0].toUpperCase()}${searchType.substring(
                            1
                        )}`}
                    />
                )}
                <button>Search</button>
            </div>
        </div>
    );
};

export default SearchBox;
