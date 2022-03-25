import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { postLogin } from "../../util/axiosConfig";

function Login(props) {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth.user) {
            navigate("/");
        }
    });

    const handleTextChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        const id = await postLogin(user.username, user.password);

        if (id) {
            navigate(`/users/${id}/profile`);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                onChange={handleTextChange}
                placeholder="Enter Username"
                name="username"
            />
            <input
                type="password"
                onChange={handleTextChange}
                placeholder="Enter Password"
                name="password"
            />
            <div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => dispatch({ type: "ON_AUTH", payload: token }),
    };
};

export default connect(null, mapDispatchToProps)(Login);
