import * as actionTypes from "./actionTypes";

export const toggleMenu = () => {
    return {
        type: actionTypes.TOGGLE_MENU,
    };
};

export const setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        payload: user,
    };
};

export const addError = (errorMessage) => {
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
        payload: stations
    }
}
