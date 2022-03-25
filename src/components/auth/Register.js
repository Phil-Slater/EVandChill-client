import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../util/axiosConfig";
import "./Auth.css";

function Register() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleTextChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

    const handleRegister = async () => {
        const { username, password, email } = user;
        const success = await postRegister(username, password, email);
        if (success) {
            navigate("/login");
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
