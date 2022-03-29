import React, { useRef, useEffect, useState } from "react";
import MapMarker from "./MapMarker";

const StationsMap = ({ center, zoom, stations }) => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    let markerItems;

    console.log(stations);

    if (map) {
        markerItems = stations.map((station) => {
            const { Latitude: lat, Longitude: lng } = station.AddressInfo;
            return <MapMarker map={map} position={{ lat, lng }} />;
        });
    }
    useEffect(() => {
        if (map) {
            console.log("adding marker");
            new window.google.maps.Marker({ position: center, map: map });
            // markerItems = stations.map(station => {})
        } else {
            setMap(
                new window.google.maps.Map(mapRef.current, {
                    center,
                    zoom,
                })
            );
            // new window.google.maps.Marker({ position: center, map: map });
        }
    }, [map]);

    return (
        <div ref={mapRef} id="map" style={{ height: "500px" }}>
            {markerItems}
            {map && <MapMarker position={center} map={map} />}
        </div>
    );
};

export default StationsMap;
