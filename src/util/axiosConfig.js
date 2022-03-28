import axios from "axios";
import { addError, setStations, setUser } from "../store/actions/actionCreators";
import store from "../store/store";
import getCurrentLocation from './getCurrentLocation'

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
        return user._id;
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
        const response = await axios.post("/user/register", {
            username,
            password,
            email,
        });
        const { token, user } = response.data;
        setAuthData(token, username, user.id);
        store.dispatch(
            setUser({ username, email: user.email, favorites: user.favorites })
        );
        return user._id;
    } catch (err) {
        console.log(err.response);
        if (err.response.data.userTaken) {
            store.dispatch(addError("Username is already in use."));
        } else {
            store.dispatch(
                addError("There was an error registering your account.")
            );
        }
        return null;
    }
};

export const postStationsByLocation = async () => {
    const location = await getCurrentLocation()
    const { latitude, longitude } = location.coords

    try {
        const response = await axios.post("/station/stations", {
            latitude,
            longitude,
        })
        console.log(response.data)
        store.dispatch(setStations(response.data))
    } catch (err) {

    }
}

export const postStationsByZip = async (zip) => {
    try {
        const response = await axios.post("/station/stations", {
            zip
        })
        console.log(response.data)
    } catch (err) {

    }
}

export const postStationsByCity = async (cityState) => {
    try {
        const response = await axios.post("/station/stations", {
            cityState
        })
        console.log(response.data)
    } catch (err) {

    }
}


