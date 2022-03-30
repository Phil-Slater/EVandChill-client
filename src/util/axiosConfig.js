import axios from "axios";
import {
    addError,
    setUser,
    setFavorites,
    deleteFavorite,
    setStations,
    axiosRequestSent,
    axiosResponseReceived,
    setStation,
} from "../store/actions/actionCreators";
import store from "../store/store";
import getCurrentLocation from "./getCurrentLocation";

export const apiAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080",
    transformRequest: [
        (data) => {
            store.dispatch(axiosRequestSent());
            return data;
        },
        ...axios.defaults.transformRequest,
    ],
    onDownloadProgress: () => {
        store.dispatch(axiosResponseReceived());
    },
});

export function setAuthData(token, user) {
    const userInfo = { token, user };
    localStorage.setItem("jwt", JSON.stringify(userInfo));
    // apiAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const removeAuthData = () => {
    localStorage.removeItem("jwt");
    delete apiAxios.defaults.headers.common["Authorization"];
};

const handleTokenUser = (data) => {
    const { token, user } = data;
    setAuthData(token, user);
    store.dispatch(setUser(user));
    return user.id;
};

export const postLogin = async (username, password) => {
    try {
        const response = await apiAxios.post("/user/login", {
            username,
            password,
        });
        return handleTokenUser(response.data);
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
        const response = await apiAxios.post("/user/register", {
            username,
            password,
            email,
        });
        return handleTokenUser(response.data);
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

export const postGuestLogin = async () => {
    try {
        const response = await apiAxios.post("/user/guest-login");
        return handleTokenUser(response.data);
    } catch {
        store.dispatch(
            addError("Error retrieving guest token. Please try again.")
        );
        return null;
    }
};

export const postStationsByLocation = async () => {
    store.dispatch(axiosRequestSent());
    const location = await getCurrentLocation();
    const { latitude, longitude } = location.coords;

    try {
        const response = await apiAxios.post("/station/stations", {
            latitude,
            longitude,
        });
        store.dispatch(setStations(response.data));
        return { success: true };
    } catch (error) {
        console.log(error);
    }
};

export const postStationsByZip = async (zip) => {
    try {
        const response = await apiAxios.post("/station/stations", {
            zip,
        });
        store.dispatch(setStations(response.data));
        return { success: true };
    } catch (error) {
        console.log(error);
    }
};

export const postStationsByCity = async (cityState) => {
    try {
        const response = await apiAxios.post("/station/stations", {
            cityState,
        });
        store.dispatch(setStations(response.data));
        return { success: true };
    } catch (error) {
        console.log(error);
    }
};

export const getFavorites = async (user) => {
    const { username } = user;
    try {
        const response = await axios.get(`/profile/${username}/my-favorites`);
        console.log("FAVORITES", response);
        if (response) {
            store.dispatch(setFavorites(response.data.favorites));
        }
    } catch (error) {
        console.log(error);
    }
};

export const handleDeleteFavorite = async (userId, favoriteId) => {
    try {
        const response = await apiAxios.delete(`/profile/favorites`, {
            data: { favoriteId: favoriteId, userId: userId },
        });
        console.log("DELETE", response);
        if (response) {
            store.dispatch(deleteFavorite(favoriteId));
        }
    } catch (error) {
        console.log(error);
    }
    //   successfull deleteing, need to refetch the user after deleteing
};

export const getStationDetails = async (stationId) => {
    try {
        const response = await apiAxios.get(`/station/id/${stationId}`);
        store.dispatch(setStation(response.data[0]));
        return response.data[0]
    } catch (error) {
        console.log(error);
    }
}


