import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {localStore} from 'infrastructure/persistance/storage'
import {RootState} from "application/store/store";

export const baseAPI = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, {getState}) => {
            const reduxToken = (getState() as RootState).auth.token;
            const localStorageToken = localStore.getItem("token");

            if (reduxToken || localStorageToken) {
                headers.set('authorization', `Bearer ${reduxToken || localStorageToken}`)
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
})
