import React from "react";
import { useSelector } from "react-redux"
import "./SearchResults.css"

const SearchResults = () => {

    const stations = useSelector((state) => state.stations.stations);
    console.log(stations)

    const stationsMapped = stations.map(station => {
        return <div className="stations-container">
            <p>{station.AddressInfo.Title}</p>
            <p>{station.AddressInfo.AddressLine1} {station.AddressInfo.Town}, {station.AddressInfo.StateOrProvince} {station.AddressInfo.Postcode}</p>
        </div>
    })

    return (
        <div className="container">
            {stationsMapped}
        </div>
    )
}

export default SearchResults
