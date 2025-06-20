import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, IShop, ShopMutation } from '../types.ts';
import { isAxiosError } from 'axios';
import axiosApi from '../axiosApi.ts';

export const createShop = createAsyncThunk<
  void,
  ShopMutation,
  { rejectValue: ErrorResponse }
>('shop/creating', async (shop, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('shops/', shop);
    console.log(response.data);
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      return rejectWithValue(err.response.data);
    }
  }
});

export const fetchShops = createAsyncThunk<
  IShop,
  void,
  { rejectValue: ErrorResponse }
>('shop/fetching', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get('shops/');
    return response.data.shops || [];
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      return rejectWithValue(err.response.data);
    }
  }
});
