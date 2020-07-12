import { createStore } from 'redux';
import appState from "../reducers/rootReducer";


const store = createStore(appState);
export default store;