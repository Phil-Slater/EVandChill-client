import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function Login(props) {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    const handleTextChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleLogin = async () => {
         const response= await fetch("http://localhost:8080/login", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
             },
             body:JSON.stringify(user),
         })
         const responseJson= await response.json()
         if (!responseJson.error) {
             const token= responseJson.token
             localStorage.setItem('username', user.username)
             localStorage.setItem('userId', responseJson.user.id)
             localStorage.setItem('jsonwebtoken', token)
             props.onLogin(token)
             navigate(`/users/${responseJson.user.id}/profile`)
         }
    }

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