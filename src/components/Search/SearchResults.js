import React from "react";
import { useSelector } from "react-redux";
import "./SearchResults.css";
import { calculateDistance } from "../../util/calculateDistance";
import { Wrapper } from "@googlemaps/react-wrapper";
import StationsMap from "./StationsMap";
import { Navigate } from "react-router-dom";

const SearchResults = () => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const stationsAndCoords = useSelector((state) => state.stations.stations);
    if (!stationsAndCoords) {
        return <Navigate to="/" />;
    }

    const { stations, location } = stationsAndCoords;

    const stationItems = stations.map((station) => {
        return (
            <div className="stations-container" key={station.ID}>
                <p>{station.AddressInfo.Title}</p>
                <p>
                    {station.AddressInfo.AddressLine1}{" "}
                    {station.AddressInfo.Town},{" "}
                    {station.AddressInfo.StateOrProvince}{" "}
                    {station.AddressInfo.Postcode}
                </p>
                <p>
                    Distance:{" "}
                    {calculateDistance(
                        stationsAndCoords.location.lat,
                        stationsAndCoords.location.lng,
                        station.AddressInfo.Latitude,
                        station.AddressInfo.Longitude
                    )}{" "}
                    miles
                </p>
            </div>
        );
    });

    return (
        <div className="search-page">
            <h1>Search Results</h1>
            <div className="search-results">
                <div className="search-list-container">{stationItems}</div>
                <Wrapper apiKey={apiKey}>
                    <StationsMap
                        center={{ lat: location.lat, lng: location.lng }}
                        zoom={12}
                        stations={stations}
                    />
                </Wrapper>
            </div>
        </div>
    );
};

export default SearchResults;
