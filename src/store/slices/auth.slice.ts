import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Auth, LoginData } from '../../interfaces/auth';
import { login as loginAPI } from '../../api/auth';

const initialState = {
    auth: {} as Auth,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, { payload }: PayloadAction<Auth>) => {
            state.auth = {
                ...state.auth,
                ...payload,
            };
        },
    },
});

const actions = () => {
    const login = createAsyncThunk(
        `${authSlice.name}/login`,
        async ({ email, password }: LoginData, { dispatch }) => {
            try {
                const response = await loginAPI(email, password)
                dispatch(authSlice.actions.setAuth(response.data));
                return response.data
            } catch (err) {
                // dispatch(alertActions.error(error)); TODO alerta de error
            }
        }
    );
    return { login }
}

export const { setAuth } = authSlice.actions;
export const { login } = actions();
export default authSlice.reducer;