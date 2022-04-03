import * as actionTypes from "../actions/actionTypes";

const initialState = {
    user: {
        username: null,
        email: null,
        favorites: [],
        reviews: [],
    },
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SET_USER:
        return {
          ...state,

          user: { ...state.user, ...action.payload },
        };
      case actionTypes.LOGOUT_USER:
        return {
          ...state,
          user: {
            ...initialState.user,
            favorites: [],
            reviews: [],
          },
        };
      case actionTypes.SET_FAVORITES:
        return {
          ...state,
          user: {
            ...state.user,
            favorites:
              // [
              //     ...state.user.favorites, ...

              // ]
              action.payload,
          },
        };
      case actionTypes.DELETE_FAVORITE:
        return {
          ...state,
          user: {
            ...state.user,
            favorites: state.user.favorites.filter(
              (favorite) => favorite._id !== action.payload
            ),
          },
        };

      case actionTypes.DELETE_REVIEW:
        return {
          ...state,
          user: {
            ...state.user,
            reviews: state.user.reviews.filter(
              (review) => review._id !== action.payload
            ),
          },
        };
      default:
        return state;
    }
};

export default authReducer;
