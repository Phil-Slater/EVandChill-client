import * as actionTypes from "../actions/actionTypes";

const initialState = {
  users: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_AUTH:
      console.log(action);
      return {
        ...state,
        isAuthenticated: action.payload !== null,
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        user: null,
      }
    default:
      return state;
  }
};

export default authReducer;


