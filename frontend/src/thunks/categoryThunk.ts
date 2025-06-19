import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Category,
  CategoryEditing,
  CategoryMutation,
  ErrorResponse,
} from '../types.ts';
import axiosApi from '../axiosApi.ts';
import { isAxiosError } from 'axios';

export const createCategory = createAsyncThunk<
  void,
  CategoryMutation,
  { rejectValue: ErrorResponse }
>('category/creating', async (category, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('categories', category);
    console.log(response.data);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
  }
});

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: ErrorResponse }
>('category/fetching', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get('categories');
    return response.data.categories || [];
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
  }
});

export const editCategory = createAsyncThunk<
  void,
  CategoryEditing,
  { rejectValue: ErrorResponse }
>('category/editing', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosApi.patch('categories/' + id._id, id);
    console.log(response.data);
    return response.data.categories || [];
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
  }
});

export const deleteCategoryById = createAsyncThunk<
  void,
  string,
  { rejectValue: ErrorResponse }
>('category/deleting', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosApi.delete('categories/' + id);
    console.log(response.data);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
  }
});
