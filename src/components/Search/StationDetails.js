import { useSelector } from "react-redux";
import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { getStationDetails } from "../../util/axiosConfig";
import { Wrapper } from "@googlemaps/react-wrapper";
import StationsMap from "./StationsMap";
import Nearby from "./Nearby";
import "./StationDetails.css";

const StationDetails = () => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const location = useLocation()
    let station = useSelector((state) => state.stations.station);
    console.log(station)
    useEffect(() => {
        if (!station) {
            handleGetStation()
        }
    }, [])

    const handleGetStation = async () => {
        const splitPath = location.pathname.split('/')
        const stationId = splitPath[2]
        station = await getStationDetails(stationId)
    }

    const connections = station && station.Connections.map(connection => {
        return <div key={connection.ID} className="plug-container">
            <h4>{connection.ConnectionType.Title}</h4>
            <p>Speed: {connection.Level.Title}</p>
            <p>Quantity: {connection.Quantity}</p>
        </div>
    })

    return (
        <>
            <div className="details">
                <h1>Station Details</h1>
                {!station ? <h2>Loading...</h2> :
                    <div>
                        <h2>{station.AddressInfo.Title}</h2>
                        <h3>Address: {station.AddressInfo.AddressLine1} {station.AddressInfo.Town}, {station.AddressInfo.StateOrProvince} {station.AddressInfo.Postcode}</h3>
                        <h3>Hours: {station.AddressInfo.AccessComments ? station.AddressInfo.AccessComments : null}</h3>
                        <h3>{station.OperatorInfo ? `Support phone number:   ${station.OperatorInfo.PhonePrimaryContact}` ? station.OperatorInfo.PhonePrimaryContact : null : null}</h3>
                        <div className="search-results">
                            <div>
                                <h3>Plugs:</h3>
                                {connections}
                            </div>
                            <Wrapper apiKey={apiKey}>
                                <StationsMap
                                    center={{ lat: station.AddressInfo.Latitude, lng: station.AddressInfo.Longitude }}
                                    zoom={15}
                                    stations={[station]}
                                />
                            </Wrapper>
                        </div>

                    </div>
                }

            </div>

        </>
    )
};

export default StationDetails;
