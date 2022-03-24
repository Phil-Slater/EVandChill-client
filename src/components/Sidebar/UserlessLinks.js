import React from "react";
import { Link } from "react-router-dom";

const UserlessLinks = () => {
    return (
        <>
            <hr />
            <Link to="/login">Sign in</Link>
            <Link to="/register">Sign Up</Link>
        </>
    );
};

export default UserlessLinks;
