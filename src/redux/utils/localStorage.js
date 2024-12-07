const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

export function getUsersFromLocalStorage() {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : {};
}

export function setUsersToLocalStorage(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function setCurrentUser(username) {
    localStorage.setItem(CURRENT_USER_KEY, username);
}

export function removeCurrentUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser() {
    return localStorage.getItem(CURRENT_USER_KEY);
}
