import axios from "axios";

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

export const fetchMovies = (page = 1) => {
    return async (dispatch) => {
        dispatch({ type: 'START_LOADING' });
        console.log(API_KEY)
        try {
            const response = await axios.get('https://kinopoiskapiunofficial.tech/api/v2.2/films',
                {
                    params: {
                        page: page,
                    },
                    headers: {
                        'X-API-KEY': API_KEY,
                    },
                });

            dispatch({
                type: 'FETCH_MOVIES_SUCCESS',
                payload: {
                    items: response.data.items,
                    totalPages: response.data.totalPages,
                    currentPage: page,
                },
            });
        } catch (error) {
            dispatch({
                type: 'REQUEST_ERROR',
                payload: error.message,
            });
        };
    };
};