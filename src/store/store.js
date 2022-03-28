import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth";
import displayReducer from "./reducers/display";
import stationsReducer from "./reducers/stations";

const rootReducer = combineReducers({
    auth: authReducer,
    display: displayReducer,
    stations: stationsReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
