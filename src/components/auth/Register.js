import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../util/axiosConfig";
import "./Auth.css";

function Register() {
    const [userInfo, setUserInfo] = useState([]);
    const navigate = useNavigate();
    const handleTextChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        const { username, password, email } = userInfo;
        const id = await postRegister(username, password, email);
        if (id) {
            navigate(`/users/${id}/profile`);
        }
    };

    return (
        <div className="auth">
            <h1>Register</h1>
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
                <p>Email</p>
                <input
                    type="email"
                    onChange={handleTextChange}
                    placeholder="Enter Email"
                    name="email"
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
            <div className="auth-input">
                <p>Repeat Password</p>
                <input
                    type="password"
                    onChange={handleTextChange}
                    placeholder="Repeat Password"
                    name="passwordRepeat"
                />
            </div>
            <button className="auth-button" onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}

export default Register;
