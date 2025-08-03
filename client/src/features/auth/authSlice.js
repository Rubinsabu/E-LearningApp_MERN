import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI } from './authAPI';

const token = sessionStorage.getItem('token');
const user = JSON.parse(sessionStorage.getItem('user'));

const initialState = {
  token: token || null,
  user: user || null,
  loading: false,
  error: null
};

export const loginUser = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    try {
      return await loginAPI(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
});

export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
    try {
      return await registerAPI(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.token = null;
        state.user = null;
        state.error = null;
        sessionStorage.clear();
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => { state.loading = true; })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
          sessionStorage.setItem('token', action.payload.token);
          sessionStorage.setItem('user', JSON.stringify(action.payload.user));
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.token = action.payload.token;
          state.user = action.payload.user;
          sessionStorage.setItem('token', action.payload.token);
          sessionStorage.setItem('user', JSON.stringify(action.payload.user));
        });
    }
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;

