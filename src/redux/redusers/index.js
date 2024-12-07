import { combineReducers } from "redux";
import { moviesReduser } from "./moviesReduser";

export const rootReduser = combineReducers({
    movies: moviesReduser,
});

