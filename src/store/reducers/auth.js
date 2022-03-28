import * as actionTypes from "../actions/actionTypes";

const initialState = {
    user: {
        username:null,
        email:null,
        favorites:[],
        reviews:[]
    }
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                user: null,
            };
        case actionTypes.SET_FAVORITES:
            return{
                ...state,
                user: {
                    ...state.user,
                    favorites: [
                        ...state.user.favorites, action.payload
                    ]
                }
            }
        default:
            return state;
    }
};

export default authReducer;
