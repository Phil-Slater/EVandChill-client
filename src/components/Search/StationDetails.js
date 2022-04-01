import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getStationDetails,
    getFavorites,
    deleteRemoveFavorite,
    postFavorite,
} from "../../util/axiosConfig";
import { Wrapper } from "@googlemaps/react-wrapper";
import StationsMap from "./StationsMap";
import Nearby from "./Nearby";
import "./StationDetails.css";
const favorite = require("./images/favorite.png");
const unfavorite = require("./images/unfavorite.png");

const StationDetails = () => {
    const [isFavorite, setIsFavorite] = useState(false);

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const params = useParams();

    let station = useSelector((state) => state.stations.station);
    let user = useSelector((state) => state.auth.user);

    const getUserFavorties = async () => {
        const favorites = await getFavorites(user);
        station &&
            favorites.forEach((favorite) => {
                if (favorite.stationId === station.ID) {
                    console.log("in favorites");
                    setIsFavorite(true);
                } else {
                    console.log("not a favorite");
                }
            });
    };
    const handleGetStation = async () => {
        station = await getStationDetails(params.id);
    };
    const connections =
        station &&
        station.Connections.map((connection) => {
            return (
                <div key={connection.ID} className="plug-container">
                    <h4>{connection.ConnectionType.Title}</h4>
                    <p>Speed: {connection.Level.Title}</p>
                    <p>Quantity: {connection.Quantity}</p>
                </div>
            );
        });

    const handleFavoriteClick = async () => {
        console.log("favorite click");
        if (isFavorite && user.username) {
            // delete the favorite
            const res = await deleteRemoveFavorite(user.username, station.ID);
            console.log(res);
            if (res) {
                console.log("responded, deleted");
                setIsFavorite(false);
            }
        } else if (!isFavorite && user.username) {
            // add the favorite
            const address = `${station.AddressInfo.AddressLine1} ${station.AddressInfo.Town}, ${station.AddressInfo.StateOrProvince} ${station.AddressInfo.Postcode}`;
            const res = await postFavorite(
                user.username,
                station.ID,
                station.AddressInfo.Title,
                address
            );
            if (res) {
                console.log("responded, added");
                setIsFavorite(true);
            }
        }
    };

    useEffect(() => {
        if (!station) {
            handleGetStation();
        }
        if (station && user.username) {
            getUserFavorties();
        }
    }, [station]);

    return (
        <>
            <div className="details">
                <h1>
                    Station Details{" "}
                    {isFavorite ? (
                        <img src={favorite} onClick={handleFavoriteClick} />
                    ) : (
                        <img src={unfavorite} onClick={handleFavoriteClick} />
                    )}
                </h1>
                {!station ? (
                    <h2>Loading...</h2>
                ) : (
                    <div>
                        <h2>{station.AddressInfo.Title}</h2>
                        <h3>
                            Address: {station.AddressInfo.AddressLine1}{" "}
                            {station.AddressInfo.Town},{" "}
                            {station.AddressInfo.StateOrProvince}{" "}
                            {station.AddressInfo.Postcode}
                        </h3>
                        <h3>
                            Hours:{" "}
                            {station.AddressInfo.AccessComments
                                ? station.AddressInfo.AccessComments
                                : "No information provided."}
                        </h3>
                        <h3>
                            {station.OperatorInfo
                                ? `Support phone number:   ${station.OperatorInfo.PhonePrimaryContact}`
                                    ? station.OperatorInfo.PhonePrimaryContact
                                    : null
                                : null}
                        </h3>
                        <div className="plug-map-container">
                            <div>
                                <h3>Plugs:</h3>
                                {connections}
                            </div>
                            <div className="google-map">
                                <Wrapper apiKey={apiKey}>
                                    <StationsMap
                                        center={{
                                            lat: station.AddressInfo.Latitude,
                                            lng: station.AddressInfo.Longitude,
                                        }}
                                        zoom={15}
                                        stations={[station]}
                                    />
                                </Wrapper>
                            </div>
                        </div>
                    </div>
                )}
                {station && <div className="nearby-containter">
                    <Nearby businesses={station.nearby} />
                </div>}
            </div>
        </>
    );
};

export default StationDetails;
