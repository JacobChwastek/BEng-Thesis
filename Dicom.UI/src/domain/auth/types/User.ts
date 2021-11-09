export interface IUser {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  role: {
    id: string,
    name: string
  } | null
}

export const DEFAULT_USER: IUser = {
  email: "",
  firstName: "",
  id: "",
  lastName: "",
  phoneNumber: "",
  role: null
};

