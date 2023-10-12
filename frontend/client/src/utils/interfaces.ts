export interface IUser {

}

export interface IState {
    isAuth: boolean;
    user: IUser;
    loading: boolean;
    registered: boolean;
}