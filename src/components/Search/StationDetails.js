import { useSelector } from "react-redux";
import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { getStationDetails } from "../../util/axiosConfig";
import { Wrapper } from "@googlemaps/react-wrapper";
import StationsMap from "./StationsMap";
import Nearby from "./Nearby";

const StationDetails = () => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const location = useLocation()
    let station = useSelector((state) => state.stations.station);
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
        return <div key={connection.ID} className="stations-container">{connection.ConnectionType.Title}
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
                        <p>Address: {station.AddressInfo.AddressLine1} {station.AddressInfo.Town}, {station.AddressInfo.StateOrProvince} {station.AddressInfo.Postcode}</p>
                        <p>Hours: {station.AddressInfo.AccessComments ? station.AddressInfo.AccessComments : null}</p>
                        <p>{station.OperatorInfo ? `Support phone number:   ${station.OperatorInfo.PhonePrimaryContact}` ? station.OperatorInfo.PhonePrimaryContact : null : null}</p>
                        <div className="search-results">
                            <h3>Plugs: {connections}</h3>
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
