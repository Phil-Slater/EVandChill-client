import React, {useEffect, useState} from "react";
import "./StationDetails.css";


const Nearby = ({businesses}) => {
const [nearbyBusinesses, setNearbyBusinesses] = useState({
  restaurants: [],
  theaters: [],
  stores: [],
});

useEffect(() => {
  setNearbyBusinesses(businesses);
}, [businesses]);

    return (
      <div>
        {nearbyBusinesses && (
          <>
            <div className="nearby-food">
              <h2>Nearby food</h2>
              <div className="business-container">
                {nearbyBusinesses.restaurants.map((business) => (
                  <div
                    className="business-details-container"
                    key={business.place_id}
                  >
                    <h4>{business.name}</h4>
                    {/* <p>{business.opening_hours.open_now}Open</p> */}
                    <p>Price level:{business.price_level}</p>
                    <p>Rated {business.rating}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="nearby-entertainment">
              <h2>Nearby Entertainment</h2>
              <div className="business-container">
                {nearbyBusinesses.theaters.map((business) => (
                  <div
                    className="business-details-container"
                    key={business.place_id}
                  >
                    <h4>{business.name}</h4>
                    {/* <p>{business.opening_hours.open_now}Open</p> */}
                    <p>Price level:{business.price_level}</p>
                    <p>Rated {business.rating}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="nearby-stores">
              <h2>Nearby Stores</h2>
              <div className="business-container">
                {nearbyBusinesses.stores.map((business) => (
                  <div
                    className="business-details-container"
                    key={business.place_id}
                  >
                    <h4>{business.name}</h4>
                    {/* {business.opening_hours.open_now && (
                <p>{business.opening_hours.open_now}Open</p>
              )} */}
                    <p>Price level:{business.price_level}</p>
                    <p>Rated {business.rating}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
}

export default Nearby