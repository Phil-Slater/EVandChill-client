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
        <div>
            <h1>Register</h1>
            <input
                type="text"
                onChange={handleTextChange}
                placeholder="Enter Username"
                name="username"
            />
            <input
                type="email"
                onChange={handleTextChange}
                placeholder="Enter Email"
                name="email"
            />
            <input
                type="password"
                onChange={handleTextChange}
                placeholder="Enter Password"
                name="password"
            />
            <div>
                <button onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
}

export default Register;
