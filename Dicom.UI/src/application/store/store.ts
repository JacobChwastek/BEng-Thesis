import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "domain/auth/store/authSlice";
import { baseAPI as api } from "infrastructure/persistance/api";
import { dicomSlice } from "domain/dwv/store/dicomSlice";


export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authSlice.reducer,
        dicom: dicomSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
