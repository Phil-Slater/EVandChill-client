import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./SearchResults.css";
import { calculateDistance } from "../../util/calculateDistance";
import { Wrapper } from "@googlemaps/react-wrapper";
import StationsMap from "./StationsMap";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const SearchResults = () => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const stationsAndCoords = useSelector((state) => state.stations.stations);
    if (!stationsAndCoords) {
        return <Navigate to="/" />;
    }

    const { stations, location } = stationsAndCoords;
    const [center, setCenter] = useState(location);
    const [zoom, setZoom] = useState(12);
    const stationItems = stations.map((station) => {
        const {
            Title,
            AddressLine1,
            Town,
            StateOrProvince,
            Postcode,
            Latitude,
            Longitude,
        } = station.AddressInfo;
        const handleClick = () => {
            setCenter({ lat: Latitude, lng: Longitude });
            setZoom(16);
        };
        return (
            <div
                className="stations-container"
                key={station.ID}
                onClick={handleClick}
            >
                <p>{Title}</p>
                <p>
                    {AddressLine1} {Town}, {StateOrProvince} {Postcode}
                </p>
                <p>
                    Distance:{" "}
                    {calculateDistance(
                        location.lat,
                        location.lng,
                        Latitude,
                        Longitude
                    )}{" "}
                    miles
                </p>
            </div>
        );
    });

    useEffect(() => {
        setCenter(location);
        setZoom(12);
    }, [stationsAndCoords]);
    return (
        <div className="search-page">
            <h1>Search Results</h1>
            <div className="search-results">
                <div className="search-list-container">{stationItems}</div>
                <Wrapper apiKey={apiKey}>
                    <StationsMap
                        center={center}
                        searchLocation={location}
                        zoom={zoom}
                        stations={stations}
                    />
                </Wrapper>
            </div>
        </div>
    );
};

export default SearchResults;
