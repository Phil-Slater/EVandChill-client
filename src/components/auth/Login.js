import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../util/axiosConfig";

function Login() {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth.user) {
            navigate("/");
        }
    }, []);

    const handleTextChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        const id = await postLogin(userInfo.username, userInfo.password);

        if (id) {
            navigate(`/profile`);
        }
    };

    return (
        <div className="auth">
            <h1>Login</h1>

            <div className="auth-input">
                <p>Username</p>
                <input
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Enter Username"
                    name="username"
                />
            </div>
            <div className="auth-input">
                <p>Password</p>
                <input
                    type="password"
                    onChange={handleTextChange}
                    placeholder="Enter Password"
                    name="password"
                />
            </div>

            <button className="auth-button" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default Login;
