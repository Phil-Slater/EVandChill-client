import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import InfoBox from "./InfoBox";

const MapMarker = ({ station, map, position, icon }) => {
    const [marker, setMarker] = useState();
    const options = { map, position, icon };

    useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker(options));
        } else if (marker && station) {
            const infoWindow = new window.google.maps.InfoWindow({
                content: renderToString(<InfoBox station={station} />),
            });
            marker.addListener("click", () => {
                infoWindow.open({
                    anchor: marker,
                    map: map,
                    shouldFocus: false,
                });
            });
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);
    return null;
};

export default MapMarker;
