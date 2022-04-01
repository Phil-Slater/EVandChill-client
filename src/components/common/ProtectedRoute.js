import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ auth, children }) => {
    const username = useSelector((state) => state.auth.user.username);
    const isLoggedIn = username !== null;

    // XOR , auth prop and isLoggedIn are opposite
    if (auth ^ isLoggedIn) {
        return <Navigate to={isLoggedIn ? "/profile" : "/"} replace />;
    }
    return children;
};

export default ProtectedRoute;
