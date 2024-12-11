import { combineReducers } from "redux";
import { moviesReducer } from "./moviesReducer";
import { authReducer } from './authReducer';
import { filterReducer } from "./filterReducer";



export const rootReducer = combineReducers({
    movies: moviesReducer,
    auth: authReducer,
    filters: filterReducer,
});
