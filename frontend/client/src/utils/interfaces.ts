export interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface IUserState {
    isAuth: boolean;
    user: IUser | null;
    loading: boolean;
    registered: boolean;
}

export interface RootState {
    user: IUserState;
}

export interface ILogin {
    email: string;
    password: string;
}