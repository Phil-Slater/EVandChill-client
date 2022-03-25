import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isMenuActive: false,
    errors: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_MENU:
            const newStatus = !state.isMenuActive;
            console.log(state.isMenuActive);
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
        default:
            return state;
    }
};

export default reducer;
