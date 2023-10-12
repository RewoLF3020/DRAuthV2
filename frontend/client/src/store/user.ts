import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "utils/interfaces";

const initialState: IUserState = {
    isAuth: false,
    user: null,
    loading: false,
    registered: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
		resetRegistered: state => {
			state.registered = false;
		}
	},
});

export const { resetRegistered } = userSlice.actions;

export default userSlice.reducer;
