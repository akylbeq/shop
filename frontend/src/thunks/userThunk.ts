import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ErrorResponse,
  User,
  UserAuthorization,
  UserMutation,
} from '../types.ts';
import axiosApi from '../axiosApi.ts';
import { isAxiosError } from 'axios';

export const signup = createAsyncThunk<
  User,
  UserMutation,
  { rejectValue: ErrorResponse }
>('user/signup', async (user, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('users/signup', user);
    localStorage.setItem('token', JSON.stringify(response.data.token));
    return response.data.user;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
  }
});
export const login = createAsyncThunk<
  User,
  UserAuthorization,
  { rejectValue: ErrorResponse }
>('user/login', async (user, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('users/login', user);
    localStorage.setItem('token', JSON.stringify(response.data.token));
    return response.data.user;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
  }
});

export const session = createAsyncThunk<
  User,
  void,
  { rejectValue: ErrorResponse }
>('user/session', async (_, { rejectWithValue }) => {
  try {
    const refreshToken = localStorage.getItem('token');
    if (!refreshToken) {
      return;
    }
    const response = await axiosApi.post('users/session', {
      refreshToken: JSON.parse(refreshToken).refreshToken,
    });
    localStorage.setItem('token', JSON.stringify(response.data.token));
    return response.data.user;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
  }
});
