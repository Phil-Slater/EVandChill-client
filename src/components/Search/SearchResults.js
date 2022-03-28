import React from "react";
import { useSelector } from "react-redux"
import "./SearchResults.css"
import { calculateDistance } from "../../util/calculateDistance";
import { Wrapper } from "@googlemaps/react-wrapper";
import StationsMap from "./StationsMap";
import { Navigate } from "react-router-dom"
import MapMarker from "./MapMarker";

const SearchResults = () => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

    const stationsAndCoords = useSelector((state) => state.stations.stations);
    if (!stationsAndCoords) {
        return <Navigate to="/" />
    }
    console.log(stationsAndCoords)


    // const stationsMapped = stationsAndCoords.stations.map(station => {
    //     return <div className="stations-container" key={station.ID}>
    //         <p>{station.AddressInfo.Title}</p>
    //         <p>{station.AddressInfo.AddressLine1} {station.AddressInfo.Town}, {station.AddressInfo.StateOrProvince} {station.AddressInfo.Postcode}</p>
    //         <p>Distance: {calculateDistance(stationsAndCoords.location.lat, stationsAndCoords.location.lng, station.AddressInfo.Latitude, station.AddressInfo.Longitude)} miles</p>
    //     </div>
    // })

    return (
        <div>
            <Wrapper apiKey={apiKey}>
                <StationsMap center={{ lat: stationsAndCoords.location.lat, lng: stationsAndCoords.location.lng }} zoom={12}>
                    <MapMarker position={stationsAndCoords.location} />
                </StationsMap>
            </Wrapper>
            {/* <div className="container">
                {stationsMapped}
            </div> */}
        </div>
    )
}

export default SearchResults;
