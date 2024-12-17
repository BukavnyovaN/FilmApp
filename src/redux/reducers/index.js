import { combineReducers } from "redux";
import { moviesReducer } from "./moviesReducer";
import { authReducer } from './authReducer';
import { filterReducer } from "./filterReducer";
import { searchReducer } from './searchReducer';

export const rootReducer = combineReducers({
    movies: moviesReducer,
    auth: authReducer,
    filters: filterReducer,
    keyword: searchReducer
});
