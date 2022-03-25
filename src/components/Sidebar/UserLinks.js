import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../../store/actions/actionCreators";

const UserLinks = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/");
        dispatch(logOutUser());
    };
    return (
        <>
            <Link to={`/users/${user._id}/profile`}>
                <h2>{user.username}</h2>
            </Link>
            <Link to="/my-favorites">My Favorites</Link>
            <Link to="/history">My Charging History</Link>
            <Link to="/reviews">My Reviews</Link>
            <button className="sidebar-logout" onClick={handleLogout}>
                Log Out
            </button>
        </>
    );
};

export default UserLinks;
