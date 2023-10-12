export interface IUser {
    
}

export interface IUserState {
    isAuth: boolean;
    user: any | null;
    loading: boolean;
    registered: boolean;
}

export interface RootState {
    user: IUserState;
}