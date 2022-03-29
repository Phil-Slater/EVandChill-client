import React, { useEffect, useState } from 'react';
import icon from './charger-icon.png'

const MapMarker = (options) => {
    const coords = options.position
    console.log(options)
    const [marker, setMarker] = useState()

    useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker({
                icon: icon
            }));
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };

    }, [marker])

    useEffect(() => {
        if (marker) {
            marker.setOptions(coords)
        }
    }, [marker, coords]);
    return null;
}

export default MapMarker;
