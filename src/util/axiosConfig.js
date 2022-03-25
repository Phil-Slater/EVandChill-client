import axios from "axios";
import { addError, setUser } from "../store/actions/actionCreators";
import store from "../store/store";

axios.defaults.baseURL =
    process.env.REACT_APP_BASE_URL || "http://localhost:8080";

export const setAuthData = (token, username, userId) => {
    localStorage.setItem("jsonwebtoken", token);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const postLogin = async (username, password) => {
    try {
        const response = await axios.post("/user/login", {
            username,
            password,
        });
        const { token, user } = response.data;
        setAuthData(token, username, user.id);
        store.dispatch(
            setUser({ username, email: user.email, favorites: user.favorites })
        );
        return user.id;
    } catch {
        store.dispatch(
            addError(
                "There was an error logging in. Double check your username and password and try again."
            )
        );
        return null;
    }
};

export const postRegister = async (username, password, email) => {
    try {
        const response = axios.post("/user/register", {
            username,
            password,
            email,
        });
        if (await response.data.success) {
            return true;
        } else {
            throw new Error("Error Registering");
        }
    } catch {
        store.dispatch(
            addError("There was an error registering your account.")
        );
        return false;
    }
};
