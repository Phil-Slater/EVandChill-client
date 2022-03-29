import React, { useRef, useEffect, useState } from "react";
import MapMarker from "./MapMarker";
const CenterIcon = require("./CenterIcon.png");

const StationsMap = ({ center, zoom, stations }) => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    let markerItems;

    console.log(stations);

    if (map) {
        markerItems = stations.map((station) => {
            const { Latitude: lat, Longitude: lng } = station.AddressInfo;
            return (
                <MapMarker
                    map={map}
                    position={{ lat, lng }}
                    station={station}
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

    return (
        <div ref={mapRef} id="map" style={{ height: "500px" }}>
            {markerItems}
            {map && <MapMarker position={center} map={map} icon={CenterIcon} />}
        </div>
    );
};

export default StationsMap;
