import axios from "axios";

export const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

export const fetchMovies = (page, order, filters) => {
    return async (dispatch) => {
        dispatch({ type: 'START_LOADING' });
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

            dispatch({
                type: 'FETCH_MOVIES_SUCCESS',
                payload: {
                    items: response.data.items,
                    totalPages: response.data.totalPages,
                    currentPage: page,
                    totalItems: response.data.total,
                },
            });
        } catch (error) {
            dispatch({
                type: 'REQUEST_ERROR',
                payload: error.message,
            });
        }
    };
};