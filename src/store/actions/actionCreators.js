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

export const setFavorites = (favorites) => {
    return {
        type: actionTypes.SET_FAVORITES,
        payload: favorites
    }
}

export const deleteFavorite = (favorite) => {
    return {
        type: actionTypes.DELETE_FAVORITE,
        payload: favorite
    }
}
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
    }
}
