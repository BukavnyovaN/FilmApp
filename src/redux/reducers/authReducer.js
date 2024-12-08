import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from '../../constants/actionTypes';

import { getCurrentUser } from '../utils/localStorage';

const currentUser = getCurrentUser();

const initialState = {
    isAuthenticated: !!currentUser,
    username: currentUser || null,
    status: 'idle',
    error: null,
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER_REQUEST:
            return { ...state, status: 'loading', error: null };
        case REGISTER_SUCCESS:
            return { ...state, isAuthenticated: true, username: action.payload.username, status: 'succeeded', error: null };
        case REGISTER_FAILURE:
            return { ...state, isAuthenticated: false, username: null, status: 'failed', error: action.error };

        case LOGIN_REQUEST:
            return { ...state, status: 'loading', error: null };
        case LOGIN_SUCCESS:
            return { ...state, isAuthenticated: true, username: action.payload.username, status: 'succeeded', error: null };
        case LOGIN_FAILURE:
            return { ...state, isAuthenticated: false, username: null, status: 'failed', error: action.error };

        case LOGOUT:
            return { ...state, isAuthenticated: false, username: null, status: 'idle', error: null };

        default:
            return state;
    }
}
