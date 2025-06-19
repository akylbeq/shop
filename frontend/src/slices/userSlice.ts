import { ErrorResponse, User } from '../types.ts';
import { createSlice } from '@reduxjs/toolkit';
import { login, session, signup } from '../thunks/userThunk.ts';
import { RootState } from '../app/store.ts';

interface UserState {
  user: User | null;
  loading: boolean;
  error: ErrorResponse | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const selectUser = (state: RootState) => state.user.user;
export const selectUserError = (state: RootState) => state.user.error;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload || null;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload || null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || null;
      })
      .addCase(session.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(session.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload || null;
      })
      .addCase(session.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || null;
      });
  },
});

export const userReducer = userSlice.reducer;
