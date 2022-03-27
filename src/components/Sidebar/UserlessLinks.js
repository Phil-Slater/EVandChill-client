import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { postGuestLogin } from "../../util/axiosConfig";

const UserlessLinks = () => {
    const navigate = useNavigate();
    const handleGuestClick = async () => {
        const id = await postGuestLogin();
        if (id) {
            navigate("/profile");
        }
    };

    return (
        <>
            <hr />
            <Link to="/login">Sign in</Link>
            <Link to="/register">Sign Up</Link>
            <button className="sidebar-guest" onClick={handleGuestClick}>
                Guest Login
            </button>
        </>
    );
};

export default UserlessLinks;
