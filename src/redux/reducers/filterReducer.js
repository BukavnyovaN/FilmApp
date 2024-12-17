import { OPEN_FILTERS, REMOVE_FILTERS, SET_FILTERS } from "../../constants/actionTypes";

const initialState = {
    filters: {
        type: 'ALL',
        country: null,
        genre: null,
        yearFrom: null,
        yearTo: null,
    },
    isFilterApplied: false,
    isFilterDrawerOpen: false,
};

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILTERS:
            return {
                ...state,
                ...action.payload,
            };
        case OPEN_FILTERS:
            return {
                ...state,
                ...action.payload,
            };
        case REMOVE_FILTERS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};