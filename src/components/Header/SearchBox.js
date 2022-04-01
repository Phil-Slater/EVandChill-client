import React from "react";
import { useState } from "react";
import ReactDropdown from "../common/ReactDropdown";
import {
    postStationsByLocation,
    postStationsByCity,
    postStationsByZip,
} from "../../util/axiosConfig";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
    const [searchType, setSearchType] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const isDisabled =
        searchType === null ||
        (searchTerm === "" && ["zip", "city"].includes(searchType));

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

    const handleSearchClicked = async () => {
        switch (searchType) {
            case "current":
                const locationResults = await postStationsByLocation();
                if (locationResults && locationResults.success) {
                    navigate("/results");
                }
                break;
            case "zip":
                const zipResults = await postStationsByZip(searchTerm);
                if (zipResults && zipResults.success) {
                    navigate("/results");
                }
                break;
            case "city":
                const cityResults = await postStationsByCity(searchTerm);
                if (cityResults && cityResults.success) {
                    navigate("/results");
                }
                break;
            default:
                return null;
        }
    };

    return (
        <div className="header-search">
            <ReactDropdown
                options={dropdownOptions}
                onChange={handleTypeChange}
            />
            <div className="header-search-box">
                {["zip", "city"].includes(searchType) && (
                    <input
                        placeholder={`${searchType[0].toUpperCase()}${searchType.substring(
                            1
                        )}`}
                        name={searchTerm}
                        onChange={handleTermChange}
                    />
                )}
                <button
                    onClick={() => handleSearchClicked()}
                    disabled={isDisabled}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBox;
