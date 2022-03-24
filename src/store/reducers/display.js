import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isMenuActive: false,
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
        default:
            return state;
    }
};

export default reducer;
