import { combineReducers } from "redux";
import authenticateReducer from "./authReducer";

// mirror firestore
export interface RootReducer {
    isLoggedIn: boolean;
}

const appState = combineReducers({
    authenticateReducer
});

export default appState;