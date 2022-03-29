import React, { useEffect, useState } from "react";

const MapMarker = (options) => {
    const [marker, setMarker] = useState();

    useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker(options));
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
