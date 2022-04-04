import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
    getStationDetails,
    getFavorites,
    deleteRemoveFavorite,
    postFavorite,
    getStationAmenities,
} from "../../util/axiosConfig";
import { Wrapper } from "@googlemaps/react-wrapper";
import StationsMap from "./StationsMap";
import Nearby from "./Nearby";
import "./StationDetails.css";
import Reviews from "../Profile/Reviews";
import { setStation } from "../../store/actions/actionCreators";
const favorite = require("./images/favorite.png");
const unfavorite = require("./images/unfavorite.png");

const StationDetails = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch();

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const params = useParams();

    let station = useSelector((state) => state.stations.station);
    let user = useSelector((state) => state.auth.user);

    const getUserFavorties = async () => {
        const favorites = await getFavorites(user);
        console.log(station, favorites);
        const favorite = favorites.find(
            (fav) => fav.stationId.toString() === station.externalId
        );
        if (favorite) setIsFavorite(true);
    };

    const handleGetStation = async () => {
        await getStationDetails(params.id);
    };

    const handleGetAmenities = async () => {
        await getStationAmenities(params.id);
    };

    const connections =
        station &&
        station.plugTypes.map((plug, index) => {
            return (
                <div key={index} className="plug-container">
                    <h4>{plug.type}</h4>
                    <p>Speed: {plug.speed}</p>
                    <p>Quantity: {plug.quantity}</p>
                </div>
            );
        });

    const handleFavoriteClick = async () => {
        console.log("favorite click");
        if (isFavorite && user.username) {
            // delete the favorite
            const res = await deleteRemoveFavorite(
                user.username,
                station.externalId
            );
            console.log(res);
            if (res) {
                console.log("responded, deleted");
                setIsFavorite(false);
            }
        } else if (!isFavorite && user.username) {
            // add the favorite
            const address = `${station.address} ${station.cityStateZip}`;
            const res = await postFavorite(
                user.username,
                station.externalId,
                station.name,
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
            // 2073600000 ms in a day
        } else if (
            !station.amenities.lastUpdated ||
            Date.now() - station.amenities.lastUpdated > 2073600000
        ) {
            handleGetAmenities();
        }

        return function cleanup() {
            dispatch(setStation(null));
        };
    }, []);

    useEffect(() => {
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
                        <img
                            src={favorite}
                            onClick={handleFavoriteClick}
                            alt="Station is favorited"
                        />
                    ) : (
                        <img
                            src={unfavorite}
                            onClick={handleFavoriteClick}
                            alt="Station is not favorited"
                        />
                    )}
                </h1>
                {!station ? (
                    <h2>Loading...</h2>
                ) : (
                    <div>
                        <h2>{station.name}</h2>
                        <h3>
                            Address: {station.address} {station.cityStateZip}
                        </h3>
                        <h3>
                            Hours:{" "}
                            {station.operatingHours
                                ? station.operatingHours
                                : "No information provided."}
                        </h3>
                        <h3>
                            {station.supportNumber
                                ? `Support phone number:   ${station.supportNumber}`
                                : null}
                        </h3>
                        <div className="plug-map-container">
                            <div className="plug-map">
                                <div>
                                    <h3>Plugs:</h3>
                                    {connections}
                                </div>
                                <div className="google-map">
                                    <Wrapper apiKey={apiKey}>
                                        <StationsMap
                                            center={{
                                                lat: station.latitude,
                                                lng: station.longitude,
                                            }}
                                            zoom={15}
                                            stations={[station]}
                                        />
                                    </Wrapper>
                                </div>
                            </div>
                            <Link to={`/${station.externalId}/add-review`}>
                                <button className="add-review">Add Review</button>
                            </Link>
                            <Reviews
                                reviews={station.reviews}
                                context="station"
                            />
                        </div>
                    </div>
                )}
                {station && (
                    <div className="nearby-containter">
                        <Nearby businesses={station.amenities} />
                    </div>
                )}
            </div>
        </>
    );
};

export default StationDetails;
