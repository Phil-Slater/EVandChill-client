import React from "react";
import { Link } from "react-router-dom";

const UserlessLinks = () => {
    return (
        <>
            <hr />
            <Link to="/login">Sign in</Link>
            <Link to="/register">Sign Up</Link>
            <button className="sidebar-guest">Guest Login</button>
        </>
    );
};

export default UserlessLinks;
