import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { postLogin } from "../../util/axiosConfig";

function Login(props) {
    const [user, setUser] = useState({});
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
      const response= await axios({
        method: 'POST',
        url:'/user/login',
        data: {username: user.username, password:user.password}
      })
         const responseData = response.data
         console.log('RESPONSE', responseData)
         if (!responseData.error) {
             const token= responseData.token
             localStorage.setItem('username', user.username)
             localStorage.setItem('userId', responseData.user._id)
             localStorage.setItem('jsonwebtoken', token)
             props.onLogin(token)
             navigate(`/users/${responseData.user._id}/profile`)
         }
    }

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

export default Login;
