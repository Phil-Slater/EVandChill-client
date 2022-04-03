import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getProfile } from "../../util/axiosConfig";
import Reviews from "./Reviews";

import "./MyReviews.css";

const MyReviews = () => {
    const user = useSelector((state) => state.auth.user);

    const { username, reviews } = user;
    useEffect(() => {
        getProfile(username);
    }, []);
    return (
        <div className="my-reviews">
            <h1>My Reviews</h1>
            <Reviews reviews={reviews} context="profile" />
        </div>
    );
};

export default MyReviews;
