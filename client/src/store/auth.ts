import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { User } from "@/api/auth";

type AuthState = {
    userID: number | null;
    username: string;
    authorities: string[];
    isAuthenticated: boolean;
};

const initialState: AuthState = {
    userID: null,
    username: "",
    authorities: [],
    isAuthenticated: false,
};

type LoginPayload = {
    token: string;
    user: User;
};

type StoredLoginPayload = {
    token: string;
    username: string;
    authorities: string[];
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin(state, action: PayloadAction<LoginPayload>) {
            const { token, user } = action.payload;

            localStorage.setItem("accessToken", token);

            state.userID = user.id;
            state.username = user.username;
            state.authorities = user.authorities.map((authority) => authority.name);
            state.isAuthenticated = true;
        },

        loadStoredLogin(state, action: PayloadAction<StoredLoginPayload>) {
            const { token, username, authorities } = action.payload;

            localStorage.setItem("accessToken", token);

            state.userID = null;
            state.username = username;
            state.authorities = authorities;
            state.isAuthenticated = true;
        },

        setLogout(state) {
            localStorage.removeItem("accessToken");

            state.userID = null;
            state.username = "";
            state.authorities = [];
            state.isAuthenticated = false;
        },
    },
});

export const { loadStoredLogin, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
