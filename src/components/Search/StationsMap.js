import React, { useRef, useEffect, useState } from 'react';

const StationsMap = ({ center, zoom, children }) => {
    const mapRef = useRef()
    const [map, setMap] = useState(null)

    useEffect(() => {
        if (!map) {
            setMap(new window.google.maps.Map(mapRef.current, {
                center,
                zoom,
            }));
        }
    }, []);

    return <div ref={mapRef} id="map" style={{ height: "500px" }}>
        {children}
    </div>;
};

export default StationsMap;
