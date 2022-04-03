import React, { useEffect, useState } from "react";
import NearbyBusiness from "./NearbyBusiness";

import "./StationDetails.css";

const Nearby = ({ businesses }) => {
    const [nearbyBusinesses, setNearbyBusinesses] = useState({
        restaurants: [],
        entertainment: [],
        stores: [],
    });

    useEffect(() => {
        setNearbyBusinesses(businesses);
    }, [businesses]);

    return (
        <div>
            {nearbyBusinesses && (
                <>
                    <NearbyBusiness
                        category="nearby-food"
                        title="Nearby Food"
                        businesses={nearbyBusinesses.restaurants}
                    />
                    <NearbyBusiness
                        category="nearby-entertainment"
                        title="Nearby Entertainment"
                        businesses={nearbyBusinesses.entertainment}
                    />
                    <NearbyBusiness
                        category="nearby-stores"
                        title="Nearby Stores"
                        businesses={nearbyBusinesses.stores}
                    />
                </>
            )}
        </div>
    );
};

export default Nearby;
