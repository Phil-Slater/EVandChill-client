import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleTextChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const responseJson = await response.json();
    navigate('/login');
    if (responseJson.error) {
        console.log(responseJson.error)
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
