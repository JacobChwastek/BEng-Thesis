import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "domain/auth/store/authSlice";
import { baseAPI as api } from "infrastructure/persistance/api";
import { dicomSlice } from "domain/dwv/store/dicomSlice";
import { rtkQueryErrorLogger } from "application/store/middleware/rtkQueryErrorLogger";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authSlice.reducer,
        dicom: dicomSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
