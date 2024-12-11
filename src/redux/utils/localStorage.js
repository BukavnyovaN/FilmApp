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

export const getFavorites = () => {
    const users = getUsersFromLocalStorage()
    const currentUsername = getCurrentUser()
    return users[currentUsername]?.favorites || [];
}

export const toggleFavorites = (movieData) => {
    const users = getUsersFromLocalStorage()
    const currentUsername = getCurrentUser()
    const favorites = users[currentUsername]?.favorites || [];

    if (users === undefined || currentUsername === undefined)
        return

    const movieExists = favorites.some(existingMovie => existingMovie.id === movieData.id);

    if (movieExists) {
        users[currentUsername].favorites = favorites.filter(existingMovie => existingMovie.id !== movieData.id);
    } else {
        favorites.push(movieData);
        users[currentUsername].favorites = favorites;
    }

    setUsersToLocalStorage(users);
};


