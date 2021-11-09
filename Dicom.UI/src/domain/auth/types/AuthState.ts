import { IUser } from "./User";
import { IAuthError } from "./AuthError";

export interface IAuthState {
  isAuth: boolean;
  user: IUser;
  isLoading: boolean;
  error: IAuthError;
  token?: string
}
