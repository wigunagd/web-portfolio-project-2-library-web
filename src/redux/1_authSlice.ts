import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from './0_authType';

const initialState: AuthState = {
    isLoggedin: false,
    user: {
        id: 0,
        name: "",
        email: "",
        phone: "",
        profilePhoto: "",
        role: "",
    },
    accessToken: ""
}

export const authSlice = createSlice({
    name: 'auth/slice',
    initialState: initialState,
    reducers: {
        setLoginData: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
            state.isLoggedin = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        logout: (state) => {
            state.isLoggedin = initialState.isLoggedin;
            state.user = initialState.user;
            state.accessToken = initialState.accessToken;
        }
    }
});

export const { setLoginData, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;