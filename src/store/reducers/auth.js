import * as actionTypes from "../actions/actionTypes";

const initialState = {
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            console.log(action);
            return {
                ...state,
                user: action.payload,
            };
        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer;
