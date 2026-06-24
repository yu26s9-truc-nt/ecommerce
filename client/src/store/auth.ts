import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    userID: number | undefined | null;
    username: string;
    avatar: string;
    email: string;
    fkRole: number[];
} = {
    userID: undefined,
    username: "",
    avatar: "",
    email: "",
    fkRole: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignIn(state, payload) {
            const accessToken = payload.payload;
        },
        setSignOut() {
            localStorage.removeItem("accessToken");
            return {
                ...initialState,
                userID: null,
            };
        },
    },
});

export const { setSignIn, setSignOut } = authSlice.actions;
export default authSlice.reducer;
