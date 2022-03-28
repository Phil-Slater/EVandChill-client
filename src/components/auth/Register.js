import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addError, clearErrors } from "../../store/actions/actionCreators";
import { postRegister } from "../../util/axiosConfig";
import "./Auth.css";

function Register() {
    const [userInfo, setUserInfo] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleTextChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        const { username, password, passwordRepeat, email } = userInfo;
        dispatch(clearErrors());
        let valid = true;
        if (!username) {
            valid = false;
            dispatch(addError("Username is required."));
        }

        if (!email) {
            valid = false;
            dispatch(addError("Email is required."));
        }

        if (!password) {
            valid = false;
            dispatch(addError("Password is required."));
        }

        if (password !== passwordRepeat) {
            valid = false;
            dispatch(addError("Passwords do not match."));
        }

        if (valid) {
            const id = await postRegister(username, password, email);
            if (id) {
                navigate(`/users/${id}/profile`);
            }
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
