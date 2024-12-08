import axios from "axios";
import { FETCH_MOVIES_SUCCESS, REQUEST_ERROR, START_LOADING } from "../../constants/actionTypes";

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

const startLoading = () => ({ type: START_LOADING });

const fetchMoviesSuccess = (data, page) => ({
    type: FETCH_MOVIES_SUCCESS,
    payload: {
        items: data.items,
        currentPage: page,
        totalItems: data.total
    }
});

const requestError = (error) => ({
    type: REQUEST_ERROR,
    payload: error.message
})

export const fetchMovies = (page, order, filters) => {
    return async (dispatch) => {
        dispatch(startLoading());
        try {
            const { type, country, genre, yearFrom, yearTo } = filters;

            const response = await axios.get('https://kinopoiskapiunofficial.tech/api/v2.2/films',
                {
                    params: {
                        page: page,
                        order: order,
                        type: type !== 'ALL' ? type : undefined,
                        countries: country ? country : undefined,
                        genres: genre ? genre : undefined,
                        yearFrom,
                        yearTo,
                    },
                    headers: {
                        'X-API-KEY': API_KEY,
                    },
                });

            dispatch(fetchMoviesSuccess(response.data, page));
        } catch (error) {
            dispatch(requestError(error));
        }
    };
};

