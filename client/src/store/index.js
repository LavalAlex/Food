import {createStore, applyMiddleware } from "redux";
// Libreria que te facilita la exportacion del store/home, en vez de poder  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));