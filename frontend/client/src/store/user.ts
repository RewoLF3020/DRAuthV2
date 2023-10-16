import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { API_URL } from "config/index";
import { IUser, IUserState } from "utils/interfaces";

const initialState: IUserState = {
    isAuth: false,
    user: null,
    loading: false,
    registered: false,
};

export const register = createAsyncThunk('users/register', async (arg: IUser, thunkApi) => {
        const body = JSON.stringify(arg);

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body
            })

            const data = response.json();

            if (response.status === 201) {
                return data;
            } else {
                return thunkApi.rejectWithValue(data);
            }
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
		resetRegistered: state => {
			state.registered = false;
		}
	},
    extraReducers: builder => {
        builder
            .addCase(register.pending, state => {
                state.loading = true;
            })
            .addCase(register.fulfilled, state => {
                state.loading = false;
                state.registered = true;
            })
            .addCase(register.rejected, state => {
                state.loading = false;
                // state.errors = action.payload;
            })
    }
});

export const { resetRegistered } = userSlice.actions;

export default userSlice.reducer;
