import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthState} from "domain/auth/types/AuthState";
import {DEFAULT_USER, IUser} from "domain/auth/types/User";
import {AuthResponse} from "./api";
import {localStore} from 'infrastructure/persistance/storage'
// import { RootState } from "../store";

export const initialState: IAuthState = {
    isAuth: Boolean(localStore.getItem("token")),
    error: {message: "", code: 200},
    isLoading: false,
    user: DEFAULT_USER,
    token: localStore.getItem("token") || undefined
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {},
    reducers: {
        setLogIn: (state, {payload}: PayloadAction<AuthResponse>) => {
            state.isAuth = payload.isSuccess;
            state.token = payload.token;
            localStore.setItem("token", payload.token)
        },
        setLoading: (state, {payload}: PayloadAction<any>) => {
            state.isLoading = payload;
        },
        setUser: (state: IAuthState, {payload}: PayloadAction<IUser>) => {
            state.user = payload;
            state.isAuth = true;
        },
        setLogOut: state => {
            state.isAuth = false;
            state.user = DEFAULT_USER;
            state.token = "";
            localStore.removeItem("token")
        },
        setAuthFailed: (state, {payload}: PayloadAction<any>) => {
            state.error = payload;
            state.isAuth = false;
        }
    }
});

export const {setUser, setLogOut, setLoading, setAuthFailed, setLogIn} = authSlice.actions;

// export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
