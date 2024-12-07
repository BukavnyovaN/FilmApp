import axios from "axios";

const API_KEY = process.env.MOVIE_API_KEY;

export const fetchMovies = (page = 1) => {
    return async (dispatch) => {
        dispatch({ type: 'START_LOADING' });
        try {
            const response = await axios.get('https://kinopoiskapiunofficial.tech/api/v2.2/films',
                {
                    params: {
                        page: page,
                    },
                    headers: {
                        'X-API-KEY': '0ad61c67-5efd-4b69-b20e-77555bcc8f8e',
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