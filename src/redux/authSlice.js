import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

function getUsersFromLocalStorage() {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : {};
}

function setUsersToLocalStorage(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ username, password }, { rejectWithValue }) => {
        const users = getUsersFromLocalStorage();

        // Проверка занятости имени
        if (users[username]) {
            return rejectWithValue('User already exists');
        }

        // Создание нового пользователя
        users[username] = {
            password,
            favorites: [],
            history: []
        };
        setUsersToLocalStorage(users);

        // Устанавливаем как текущего пользователя
        localStorage.setItem(CURRENT_USER_KEY, username);

        return { username };
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }, { rejectWithValue }) => {
        const users = getUsersFromLocalStorage();

        // Проверяем существование пользователя
        if (!users[username]) {
            return rejectWithValue('User does not exist');
        }

        // Проверяем пароль
        if (users[username].password !== password) {
            return rejectWithValue('Incorrect password');
        }

        // Устанавливаем как текущего пользователя
        localStorage.setItem(CURRENT_USER_KEY, username);
        return { username };
    }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    return {};
});

const initialState = {
    isAuthenticated: false,
    username: null,
    status: 'idle',
    error: null
};

// Если пользователь уже вошел в систему (например, обновил страницу), выполняем повторный запрос из локального хранилища
const currentUser = localStorage.getItem(CURRENT_USER_KEY);
if (currentUser) {
    initialState.isAuthenticated = true;
    initialState.username = currentUser;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.username = action.payload.username;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.username = null;
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.username = action.payload.username;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.username = null;
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.username = null;
                state.status = 'idle';
                state.error = null;
            });
    }
});

export default authSlice.reducer;
