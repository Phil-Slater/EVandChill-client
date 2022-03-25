import React from "react";
import ChargingHistory from "./ChargingHistory";
import Favorites from "./Favorites";
import Reviews from "./Reviews";

const Profile = () => {
    const username = localStorage.getItem("username");
    return (
      <div className="profile">
        <h1>Welcome {username}</h1>
        <Favorites/>
        <ChargingHistory/>
        <Reviews/>
      </div>
    );
}

export default Profile