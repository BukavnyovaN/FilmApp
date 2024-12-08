import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from '../../constants/actionTypes';

import {
    getUsersFromLocalStorage,
    setUsersToLocalStorage,
    setCurrentUser,
    removeCurrentUser,
} from '../utils/localStorage';

// Action creators
function registerRequest() {
    return { type: REGISTER_REQUEST };
}

function registerSuccess(username) {
    return { type: REGISTER_SUCCESS, payload: { username } };
}

function registerFailure(error) {
    return { type: REGISTER_FAILURE, error };
}

function loginRequest() {
    return { type: LOGIN_REQUEST };
}

function loginSuccess(username) {
    return { type: LOGIN_SUCCESS, payload: { username } };
}

function loginFailure(error) {
    return { type: LOGIN_FAILURE, error };
}

function logoutAction() {
    return { type: LOGOUT };
}

// Thunks
export function registerUser({ username, password }) {
    return (dispatch) => {
        dispatch(registerRequest());

        const users = getUsersFromLocalStorage();

        if (users[username]) {
            dispatch(registerFailure('Пользователь уже зарегистрирован'));
            return;
        }

        users[username] = {
            password,
            favorites: [],
            history: []
        };
        setUsersToLocalStorage(users);
        setCurrentUser(username);

        dispatch(registerSuccess(username));
    };
}

export function loginUser({ username, password }) {
    return (dispatch) => {
        dispatch(loginRequest());

        const users = getUsersFromLocalStorage();
        if (!users[username]) {
            dispatch(loginFailure('Пользователя не существует'));
            return;
        }

        if (users[username].password !== password) {
            dispatch(loginFailure('Неверный пароль'));
            return;
        }

        setCurrentUser(username);
        dispatch(loginSuccess(username));
    };
}

export function logoutUser() {
    return (dispatch) => {
        removeCurrentUser();
        dispatch(logoutAction());
    };
}
