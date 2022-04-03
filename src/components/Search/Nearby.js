import React, { useEffect, useState } from "react";
import StarRatingComponent from "react-star-rating-component";

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

  const getDollarSigns = (level) => {
    let dollarSigns = " "
    for (let i = 1; i <= level; i++) {
      dollarSigns += '$';
    }
    return dollarSigns;
  }

  const businessLink = (id) => {
    window.open(`https://www.google.com/maps/place/?q=place_id:${id}`)
  }

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
                  key={business.place_id} onClick={() => businessLink(business.place_id)}
                >
                  <h4>{business.name}</h4>
                  {/* <p>{business.opening_hours.open_now}Open</p> */}
                  {business.price_level ? (
                    <p>Price level:{getDollarSigns(business.price_level)}</p>
                  ) : (
                    <p>Price Level Not Available</p>
                  )}
                  {business.rating ? (
                    <StarRatingComponent
                      name="rate2"
                      editing={false}
                      starCount={5}
                      value={business.rating}
                    />
                  ) : (
                    <p>Ratings Not Available</p>
                  )}
                </div>

              ))}
              
            </div>
          </div>
          <div className="nearby-entertainment">
            <h2>Nearby Entertainment</h2>
            <div className="business-container">
              {nearbyBusinesses.entertainment.map((business) => (
                <div
                  className="business-details-container"
                  key={business.place_id} onClick={() => businessLink(business.place_id)}
                >
                  <h4>{business.name}</h4>
                  {/* <p>{business.opening_hours.open_now}Open</p> */}
                  {business.price_level ? (
                    <p>Price level:{getDollarSigns(business.price_level)}</p>
                  ) : (
                    <p>Price Level Not Available</p>
                  )}
                  {business.rating ? (
                    <StarRatingComponent
                      name="rate2"
                      editing={false}
                      starCount={5}
                      value={business.rating}
                    />
                  ) : (
                    <p>Ratings Not Available</p>
                  )}

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
                  key={business.place_id} onClick={() => businessLink(business.place_id)}
                >
                  <h4>{business.name}</h4>
                  {/* {business.opening_hours.open_now && (
                <p>{business.opening_hours.open_now}Open</p>
              )} */}
                  {business.price_level ? (
                    <p>Price level:{getDollarSigns(business.price_level)}</p>
                  ) : (
                    <p>Price Level Not Available</p>
                  )}
                  {business.rating ? (
                    <StarRatingComponent
                      name="rate2"
                      editing={false}
                      starCount={5}
                      value={business.rating}
                    />
                  ) : (
                    <p>Ratings Not Available</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )
      }
    </div >
  );
}

export default Nearby
