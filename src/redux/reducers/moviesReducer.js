const inititalState = {
    movies: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
};

export const moviesReducer = (state = inititalState, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_MOVIES_SUCCESS':
            return {
                ...state,
                loading: false,
                movies: action.payload.items,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
            };
        case 'REQUEST_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default: return state;
    };
};
