import { createSlice } from '@reduxjs/toolkit';
import { ErrorResponse, IProduct } from '../types.ts';
import { fetchProducts } from '../thunks/productsThunk.ts';
import { RootState } from '../app/store.ts';

interface ProductsSlice {
  products: IProduct[];
  loading: boolean;
  image: string | null;
  galleryImages: string[];
  error: ErrorResponse | null;
}

const initialState: ProductsSlice = {
  products: [],
  loading: false,
  image: null,
  galleryImages: [],
  error: null,
};

export const selectProducts = (state: RootState) => state.products.products;

export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload;
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || null;
      });
  },
});

export const productsReducer = productsSlice.reducer;
