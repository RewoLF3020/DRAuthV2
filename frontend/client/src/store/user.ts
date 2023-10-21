import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ILogin, IUser, IUserState } from "utils/interfaces";

export const register = createAsyncThunk('users/register', async (arg: IUser, thunkAPI) => {
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

        const data = await response.json();

        if (response.status === 201) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const getUser = createAsyncThunk('users/me', async (_, thunkAPI) => {
    try {
        const response = await fetch('/api/users/me', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        const data = await response.json();

        if (response.status === 200) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const login = createAsyncThunk('users/login', async (arg: ILogin, thunkAPI) => {
    const body = JSON.stringify(arg);

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body
        });

        const data = await response.json();

        if (response.status === 200) {
            const { dispatch } = thunkAPI;

            dispatch(getUser());

            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const refreshAuth = createAsyncThunk('users/refresh', async (_, thunkAPI) => {
    try {
        const response = await fetch('/api/users/refresh', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        const data = await response.json();

        if (response.status === 200) {
            const { dispatch } = thunkAPI;

            dispatch(getUser());

            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const checkAuth = createAsyncThunk('users/verify', async (_, thunkAPI) => {
    try {
        const response = await fetch('/api/users/verify', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        const data = await response.json();

        if (response.status === 200) {
            const { dispatch } = thunkAPI;

            dispatch(getUser());

            return data;
        } else if (response.status === 401) {
            const { dispatch } = thunkAPI;

            dispatch(refreshAuth());
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk('users/logout', async (_, thunkAPI) => {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        const data = await response.json();

        if (response.status === 200) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

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
            .addCase(login.pending, state => {
                state.loading = true;
            })
            .addCase(login.fulfilled, state => {
                state.loading = false;
                state.isAuth = true;
            })
            .addCase(login.rejected, state => {
                state.loading = false;
            })
            .addCase(getUser.pending, state => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, state => {
                state.loading = false;
            })
            .addCase(checkAuth.pending, state => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, state => {
                state.loading = false;
                state.isAuth = true;
            })
            .addCase(checkAuth.rejected, state => {
                state.loading = false;
            })
            .addCase(refreshAuth.pending, state => {
                state.loading = true;
            })
            .addCase(refreshAuth.fulfilled, state => {
                state.loading = false;
                state.isAuth = true;
            })
            .addCase(refreshAuth.rejected, state => {
                state.loading = false;
            })
            .addCase(logout.pending, state => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, state => {
                state.loading = false;
                state.isAuth = false;
                state.user = null;
            })
            .addCase(logout.rejected, state => {
                state.loading = false;
            });
    }
});

export const { resetRegistered } = userSlice.actions;

export default userSlice.reducer;
