import {
	MiddlewareAPI,
	isRejectedWithValue,
	Middleware
} from "@reduxjs/toolkit";
import { setLogOut } from "domain/auth/store/authSlice";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => (next) => (action) => {
		// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
		if (isRejectedWithValue(action)) {
			// api.dispatch(setLogOut())
			const a = window.location.pathname
			// console.log(a);
			// console.log('We got a rejected action!')
		}

		// console.log(action);
		return next(action)
	}
