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

const apiAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080",
    transformRequest: [
        (data, headers) => {
            const userRaw = localStorage.getItem("jwt");
            if (userRaw) {
                const { token } = JSON.parse(userRaw);
                headers["Authorization"] = `Bearer ${token}`;
            }
            if (data && data.noLoad) {
                delete data.noLoad;
            } else {
                store.dispatch(axiosRequestSent());
            }
            return data;
        },
        ...axios.defaults.transformRequest,
    ],
    headers: {},
    onDownloadProgress: () => {
        store.dispatch(axiosResponseReceived());
    },
});

export function setAuthData(token, user) {
    const userInfo = { token, user };
    localStorage.setItem("jwt", JSON.stringify(userInfo));
}

export const removeAuthData = () => {
    localStorage.removeItem("jwt");
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

    try {
        const location = await getCurrentLocation();
        const { latitude, longitude } = location.coords;

        const response = await apiAxios.post("/station/stations", {
            latitude,
            longitude,
        });
        store.dispatch(setStations(response.data));
        return { success: true };
    } catch (error) {
        const errorMessage =
            error.constructor.name === "GeolocationPositionError"
                ? "Unable to get your location"
                : "Unable to find stations";
        store.dispatch(addError(errorMessage));
        store.dispatch(axiosResponseReceived());
    }
};

export const postStationsByZip = async (zip) => {
    try {
        const response = await apiAxios.post("/station/stations", {
            zip,
        });
        store.dispatch(setStations(response.data));
        return { success: true };
    } catch {
        store.dispatch(addError("Unable to find stations"));
    }
};

export const postStationsByCity = async (cityState) => {
    try {
        const response = await apiAxios.post("/station/stations", {
            cityState,
        });
        store.dispatch(setStations(response.data));
        return { success: true };
    } catch {
        store.dispatch(addError("Unable to find stations"));
    }
};

export const getFavorites = async (user) => {
    const { username } = user;
    try {
        const response = await apiAxios.get(
            `/profile/${username}/my-favorites`
        );
        if (response) {
            store.dispatch(setFavorites(response.data.favorites));
            return response.data.favorites;
        }
    } catch {
        store.dispatch(addError("Unable to load favorites"));
    }
};

export const handleDeleteFavorite = async (userId, favoriteId) => {
    try {
        const response = await apiAxios.delete(`/profile/favorites`, {
            data: { favoriteId: favoriteId, userId: userId },
        });
        if (response) {
            store.dispatch(deleteFavorite(favoriteId));
        }
    } catch {
        store.dispatch(addError("Unable to delete favorite"));
    }
};

export const postFavorite = async (username, stationNumber, title, address) => {
    try {
        const response = await apiAxios.post(`/station/add-favorite`, {
            username,
            stationNumber,
            title,
            address,
            noLoad: true,
        });
        if (response) {
            return { success: true };
        }
    } catch {
        store.dispatch(addError("Unable to add favorite"));
    }
};

export const deleteRemoveFavorite = async (username, stationNumber) => {
    try {
        const response = await apiAxios.delete(`/station/remove-favorite`, {
            data: {
                username: username,
                stationNumber: stationNumber,
                noLoad: true,
            },
        });
        if (response.data.success) {
            store.dispatch(deleteFavorite(stationNumber));
            return { success: true };
        }
    } catch {
        store.dispatch(addError("Unable to remove favorite"));
    }
};
export const postAddReview = async ({
    stationNumber,
    username,
    review,
    isWorking,
    rating,
}) => {
    console.log("reqest args", {
        stationNumber,
        username,
        review,
        isWorking,
    });

    try {
        const response = await apiAxios.post(
            `/station/${stationNumber}/add-review`,
            {
                stationNumber,
                username,
                review,
                isWorking,
                rating,
            }
        );
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        store.dispatch(addError("Unable to add reivew"));
        return null;
    }
};

// export const getUserReviews = async (user) => {
//        const { username } = user;
//     try {
//         const response = await axios.get(`/profile/${username}/reviews`);
//         if (response) {
//             store.dispatch(setReviews(response.data.reviews));
//             return response.data.reviews;
//         }
//     } catch {
//         store.dispatch(addError("Unable to load reviews"));
//     }
// };

// export const getStationReviews= async (stationId) =>{
//     try {
//         const response = await axios.get(`/station/${stationId}/reviews`);
//         if (response) {
//             store.dispatch(setReviews(response.data.reviews));
//             return response.data.favorites;
//         }
//     } catch {
//         store.dispatch(addError("Unable to load favorites"));
//     }
// };
// }

export const getStationDetails = async (stationId) => {
    try {
        const response = await apiAxios.get(`/station/id/${stationId}`);
        store.dispatch(setStation(response.data));
        console.log("DETAILS RESPONSE", response.data);
        // return response.data;
    } catch {
        store.dispatch(addError("Unable to get station details"));
    }
};
