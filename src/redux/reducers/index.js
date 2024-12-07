import { combineReducers } from "redux";
import { moviesReducer } from "./moviesReducer";
import { authReducer } from './authReducer';


export const rootReducer = combineReducers({
    movies: moviesReducer,
    auth: authReducer
});
