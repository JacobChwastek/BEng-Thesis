import {baseAPI} from 'infrastructure/persistance/api'


export interface User {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    role: {
        id: string,
        name: string
    }
}

export interface RegisterRequest {
    email: string,
    password: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface UserResponse {
    id: string,
    user: User
}

export interface AuthResponse {
    isSuccess: boolean,
    token: string,
    errors: string[]
}

export const api = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (credentails) => ({
                url: 'user/register',
                method: 'POST',
                body: credentails,
            })
        }),
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'user/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        user: builder.mutation<UserResponse, void>({
            query: () => ({
                url: 'user',
                method: 'GET',
            }),
        }),
        protected: builder.mutation<{ message: string }, void>({
            query: () => 'protected',
        }),
    }),
    overrideExisting: false
})


export const { useRegisterMutation, useLoginMutation, useProtectedMutation, useUserMutation } = api;
