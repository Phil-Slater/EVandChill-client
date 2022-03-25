import React from "react";
import { useState } from "react";
import ReactDropdown from "../common/ReactDropdown";
import { postStationsByLocation, postStationsByCity, postStationsByZip } from "../../util/axiosConfig";

const SearchBox = () => {
    const [searchType, setSearchType] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    const handleTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClicked = () => {
        switch (searchType) {
            case 'current':
                postStationsByLocation();
                break;
            case 'zip':
                postStationsByZip(searchTerm);
                break;
            case 'city':
                postStationsByCity(searchTerm);
                break;
            default:
                return null;
        }
    };

    return (
        <div className="header-search">
            <ReactDropdown options={dropdownOptions} onChange={handleTypeChange} />
            <div className="header-search-box">
                {["zip", "city"].includes(searchType) && (
                    <input
                        placeholder={`${searchType[0].toUpperCase()}${searchType.substring(
                            1
                        )}`} name={searchTerm} onChange={handleTermChange}
                    />
                )}
                <button onClick={() => handleSearchClicked()}>Search</button>
            </div>
        </div>
    );
};

export default SearchBox;
