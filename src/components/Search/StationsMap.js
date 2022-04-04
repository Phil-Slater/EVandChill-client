import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStation } from "../../store/actions/actionCreators";
import MapMarker from "./MapMarker";
import "./StationDetails.css";
const CenterIcon = require("./images/CenterIcon.png");
const ChargerIcon = require("./images/charger.png");

const StationsMap = ({ center, zoom, stations, searchLocation }) => {
    const station = useSelector((state) => state.stations.station);
    const mapRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [map, setMap] = useState(null);
    let markerItems;
    const bc = new BroadcastChannel("google");

    useEffect(() => {
        bc.onmessage = (e) => {
            bc.close();
            const index = e.data;
            if (
                stations[index] &&
                JSON.stringify(station) !== JSON.stringify(stations[index])
            ) {
                navigate(`/station/${stations[index].externalId}`);
            }
        };
    }, []);

    if (map && stations.length !== 1) {
        markerItems = stations.map((station, index) => {
            const { latitude: lat, longitude: lng } = station;
            return (
                <MapMarker
                    key={index}
                    map={map}
                    index={index}
                    position={{ lat, lng }}
                    station={station}
                    icon={ChargerIcon}
                />
            );
        });
    }
    useEffect(() => {
        if (!map) {
            setMap(
                new window.google.maps.Map(mapRef.current, {
                    center,
                    zoom,
                })
            );
        }
    }, [map]);

    if (map) {
        map.setCenter(center);
        map.setZoom(zoom);
    }

    return (
        <div ref={mapRef} className="search-map">
            {markerItems}
            {map && (
                <MapMarker
                    position={
                        searchLocation || {
                            lat: station.latitude,
                            lng: station.longitude,
                        }
                    }
                    map={map}
                    icon={CenterIcon}
                />
            )}
        </div>
    );
};

export default StationsMap;
