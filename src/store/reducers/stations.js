import * as actionTypes from "../actions/actionTypes";

const initialState = {
    stations: null
};

const stationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STATIONS:
            return {
                ...state,
                stations: action.payload
            };
        default:
            return state;
    }
};

export default stationsReducer;
