import { SET_KEYWORD, RESET_KEYWORD, REMOVE_KEYWORD } from "../../constants/actionTypes";

const initialState = {
    keyword: null
};

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_KEYWORD:
            return {
                ...state,
                ...action.payload,
            };
        case RESET_KEYWORD:
            return {
                ...state,
                ...action.payload,
            };
        case REMOVE_KEYWORD:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
