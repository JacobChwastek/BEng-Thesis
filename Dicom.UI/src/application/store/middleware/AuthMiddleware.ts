import {AnyAction, Middleware, ThunkDispatch} from "@reduxjs/toolkit";

// const errorMiddleware: Middleware<{}, unknown, ThunkDispatch<unknown, unknown, AnyAction>> =
//     ({ dispatch }) =>
//         (next) =>
//             async (action) => {

type IAuthMiddleware = Middleware<{}, unknown, ThunkDispatch<unknown, any, AnyAction>>

// const AuthMiddleware: IAuthMiddleware = ({ })
