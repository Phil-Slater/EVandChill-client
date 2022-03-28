import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isMenuActive: false,
    isLoading: false,
    errors: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_MENU:
            const newStatus = !state.isMenuActive;
            return {
                ...state,
                isMenuActive: newStatus,
            };
        case actionTypes.ADD_ERROR:
            return {
                ...state,
                errors: [...state.errors, action.payload],
            };
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                errors: [],
            };
        case actionTypes.AXIOS_REQUEST_SENT:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.AXIOS_RESPONSE_RECEIVED:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default reducer;
