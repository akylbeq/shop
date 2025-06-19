import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ErrorResponse,
  IProduct,
  Product,
  ProductMutation,
  Upload,
  UploadMutation,
} from '../types.ts';
import axiosApi from '../axiosApi.ts';
import { isAxiosError } from 'axios';

export const uploadImage = createAsyncThunk<
  Upload,
  UploadMutation,
  { rejectValue: ErrorResponse }
>('products/upload', async (img, { rejectWithValue }) => {
  try {
    const form = new FormData();
    console.log(img);
    if (img.image) {
      form.append('image', img.image);
    }
    if (img.galleryImages.length > 0) {
      img.galleryImages.forEach((i) => {
        form.append('galleryImages', i);
      });
    }
    console.log(form);
    const response = await axiosApi.post('/upload', form);
    return response.data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      rejectWithValue(err.response?.data);
    }
  }
});

export const createProduct = createAsyncThunk<
  IProduct,
  ProductMutation,
  { rejectValue: ErrorResponse }
>('product/creating', async (product, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('/products', product);
    console.log(response.data);
    return response.data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      rejectWithValue(err.response?.data);
    }
  }
});

export const fetchProducts = createAsyncThunk<
  IProduct[],
  void,
  { rejectValue: ErrorResponse }
>('product/fetching', async (_v, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get('/products');
    return response.data.products;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      rejectWithValue(err.response?.data);
    }
  }
});

export const editProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: ErrorResponse }
>('product/editing', async (product, { rejectWithValue }) => {
  try {
    const response = await axiosApi.patch('products/' + product._id, product);
    return response.data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      rejectWithValue(err.response?.data);
    }
  }
});

export const deleteProductById = createAsyncThunk<
  void,
  string,
  { rejectValue: ErrorResponse }
>('product/deleting', async (id, { rejectWithValue }) => {
  try {
    console.log(id);
    const response = await axiosApi.delete('products/' + id);
    console.log(response.data);
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      rejectWithValue(err.response?.data);
    }
  }
});
