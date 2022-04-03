import * as actionTypes from "./actionTypes";

export const toggleMenu = () => {
    return {
        type: actionTypes.TOGGLE_MENU,
    };
};

export const axiosRequestSent = () => {
    return {
        type: actionTypes.AXIOS_REQUEST_SENT,
    };
};

export const axiosResponseReceived = () => {
    return {
        type: actionTypes.AXIOS_RESPONSE_RECEIVED,
    };
};

export const setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        payload: user,
    };
};

export const setFavorites = (favorites) => {
    return {
        type: actionTypes.SET_FAVORITES,
        payload: favorites,
    };
};

export const deleteFavorite = (favorite) => {
    return {
        type: actionTypes.DELETE_FAVORITE,
        payload: favorite,
    };
};

export const logOutUser = () => {
    localStorage.removeItem("jwt");
    return {
        type: actionTypes.LOGOUT_USER,
    };
};

export const addError = (errorMessage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return {
        type: actionTypes.ADD_ERROR,
        payload: errorMessage,
    };
};

export const clearErrors = () => {
    return { type: actionTypes.CLEAR_ERRORS };
};

export const setStations = (stations) => {
    return {
        type: actionTypes.SET_STATIONS,
        payload: stations,
    };
};

export const setStation = (station) => {
    return {
        type: actionTypes.SET_STATION,
        payload: station,
    };
};

export const setAmenities = (amenties) => {
    return {
        type: actionTypes.SET_AMENITIES,
        payload: amenties,
    };
};

export const deleteReview = (data) => {
  return {
    type: actionTypes.DELETE_REVIEW,
    payload: data,
  };
};
