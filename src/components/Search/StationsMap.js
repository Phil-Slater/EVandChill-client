import React, { useRef, useEffect, useState } from "react";
import MapMarker from "./MapMarker";
const CenterIcon = require("./images/CenterIcon.png");
const ChargerIcon = require("./images/charger.png")

const StationsMap = ({ center, zoom, stations }) => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    let markerItems;

    if (map && stations.length !== 1) {
        markerItems = stations.map((station) => {
            const { Latitude: lat, Longitude: lng } = station.AddressInfo;
            return (
                <MapMarker
                    map={map}
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
            {map && <MapMarker position={center} map={map} icon={CenterIcon} />}
        </div>
    );
};

export default StationsMap;
