import { SET_KEYWORD, RESET_KEYWORD, REMOVE_KEYWORD } from "../../constants/actionTypes";

export const setKeyword = (keyword) => ({
    type: SET_KEYWORD,
    payload: { keyword: keyword }
});

export const resetKeyword = () => ({
    type: RESET_KEYWORD,
    payload: { keyword: '' }
})

export const removeKeyword = () => ({
    type: REMOVE_KEYWORD,
    payload: { keyword: null }
})
