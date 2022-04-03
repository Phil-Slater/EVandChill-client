import React, { useEffect } from "react";
import Favorites from "./Favorites";
import Reviews from "./Reviews";
import "./Profile.css";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.auth.user);

    const { username, email, reviews } = user;
    console.log('User - Profile page', user);

    useEffect(() => {

    }, [user])



    return (
        <div className="profile">
            <h1>Welcome {username}!</h1>
            <p className="profile-email">
                <i>{email}</i>
            </p>
            <Favorites favorites= {user.favorites}/>
            <Reviews reviews={reviews} context="profile"/>
        </div>
    );
};

export default Profile;
