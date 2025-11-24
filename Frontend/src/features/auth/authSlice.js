import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../auth/authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register Thunk
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try { return await authService.register(user); } 
  catch (error) { return thunkAPI.rejectWithValue(error.response.data.message); }
});

// Login Thunk
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try { return await authService.login(user); } 
  catch (error) { return thunkAPI.rejectWithValue(error.response.data.message); }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false; state.isSuccess = false; state.isError = false; state.message = '';
    },
    logoutUser: (state) => {
      authService.logout();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { state.isLoading = true; })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false; state.isSuccess = true; state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false; state.isError = true; state.message = action.payload; state.user = null;
      })
      .addCase(login.pending, (state) => { state.isLoading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false; state.isSuccess = true; state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false; state.isError = true; state.message = action.payload; state.user = null;
      });
  },
});

export const { reset, logoutUser } = authSlice.actions;
export default authSlice.reducer;