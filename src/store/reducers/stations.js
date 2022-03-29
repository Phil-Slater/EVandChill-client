import * as actionTypes from "../actions/actionTypes";

const initialState = {
    stations: null,
    station: null,
};

const stationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STATIONS:
            return {
                ...state,
                stations: action.payload
            };
        case actionTypes.SET_STATION:
            return {
                ...state,
                station: action.payload
            }
        default:
            return state;
    }
};

export default stationsReducer;
