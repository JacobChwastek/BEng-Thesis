import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "domain/auth/types/AuthState";
import { DEFAULT_USER, IUser } from "domain/auth/types/User";
// import { RootState } from "../store";

export const initialState: IAuthState = {
	isAuth: false,
	error: { message: "", code: 200 },
	isLoading: false,
	user: DEFAULT_USER
};

// const fetchUserById = createAsyncThunk("users/fetchByIdStatus", async (userId, thunkAPI) => {
// 	const response = await userAPI.fetchById(userId);
// 	return response.data;
// });

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoading: (state, { payload }: PayloadAction<any>) => {
			state.isLoading = payload;
		},
		setUser: (state: IAuthState, { payload }: PayloadAction<IUser>) => {
			state.user = payload;
			state.isAuth = true;
		},
		setLogOut: state => {
			state.isAuth = false;
			state.user = DEFAULT_USER;
		},
		setAuthFailed: (state, { payload }: PayloadAction<any>) => {
			state.error = payload;
			state.isAuth = false;
		}
	}
});

export const { setUser, setLogOut, setLoading, setAuthFailed } = authSlice.actions;

// export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
