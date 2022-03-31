import React, {useEffect, useState} from "react";


const Nearby = ({businesses}) => {
const [nearbyBusinesses, setNearbyBusinesses] = useState({
  restaurants: [],
  theaters: [],
  stores: [],
});

console.log("before", nearbyBusinesses);
useEffect(() => {
  setNearbyBusinesses(businesses);
}, [businesses]);
console.log("after", nearbyBusinesses);


    return (
      <div>
        {nearbyBusinesses && (
        <>
        <div>
          <h2>Nearby food</h2>
          {nearbyBusinesses.restaurants.map((business) => (
            <div key={business.place_id}>
              <h3>{business.name}</h3>
              {/* <p>{business.opening_hours.open_now}Open</p> */}
              <p>Price level:{business.price_level}</p>
              <p>Rated {business.rating}</p>
            </div>
          ))}
        </div>
        <div>
          <h2>Nearby Entertainment</h2>
          {nearbyBusinesses.theaters.map((business) => (
            <div key={business.place_id}>
              <h3>{business.name}</h3>
              {/* <p>{business.opening_hours.open_now}Open</p> */}
              <p>Price level:{business.price_level}</p>
              <p>Rated {business.rating}</p>
            </div>
          ))}
        </div>
        <div>
          <h2>Nearby Stores</h2>
          {nearbyBusinesses.stores.map((business) => (
            <div key={business.place_id}>
              <h3>{business.name}</h3>
              {/* {business.opening_hours.open_now && (
                <p>{business.opening_hours.open_now}Open</p>
              )} */}
              <p>Price level:{business.price_level}</p>
              <p>Rated {business.rating}</p>
            </div>
          ))}
        </div>
        </>
        )}
      </div>
    );
}

export default Nearby