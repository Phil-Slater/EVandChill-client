import React from "react";
import { Link } from "react-router-dom";

const UserLinks = ({ user }) => {
    return (
        <>
            <Link to="/profile">
                <h2>{user.username}</h2>
            </Link>
            <Link to="/favorites">My Favorites</Link>
            <Link to="/history">My Charging History</Link>
            <Link to="/reviews">My Reviews</Link>
        </>
    );
};

export default UserLinks;
