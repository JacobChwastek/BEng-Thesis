export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // accountSettings: IAccountSettings;
  role: string;
}

export const DEFAULT_USER: IUser = {
  email: "",
  firstName: "",
  id: "",
  lastName: "",
  password: "",
  role: ""
  // accountSettings: {
  //   id: "",
  //   isConfirmed: false,
  //   registrationStep: 0,
  // },
};
