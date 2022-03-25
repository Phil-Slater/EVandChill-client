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
