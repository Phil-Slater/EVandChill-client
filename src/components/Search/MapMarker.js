import React, { useEffect, useState } from "react";
import InfoBox from "./InfoBox";

const MapMarker = ({ station, map, position, icon, index }) => {
    const [marker, setMarker] = useState();
    const options = { map, position, icon };

    useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker(options));
        } else if (marker && station) {
            const infoWindow = new window.google.maps.InfoWindow({
                content: InfoBox(station, index),
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

    useEffect(() => {
        if (marker) {
            marker.setPosition(position);
        }
    }, [position]);
    return null;
};

export default MapMarker;
