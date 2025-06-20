import { ErrorResponse, IShop } from '../types.ts';
import { fetchShops } from '../thunks/shopsThunk.ts';
import { RootState } from '../app/store.ts';
import { createSlice } from '@reduxjs/toolkit';

interface ShopsState {
  shops: IShop[];
  error: ErrorResponse | null;
}

const initialState: ShopsState = {
  shops: [],
  error: null,
};

export const selectShops = (state: RootState) => state.shops.shops;

export const shopsSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchShops.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchShops.fulfilled, (state, { payload }) => {
        state.shops = payload;
      })
      .addCase(fetchShops.rejected, (state, { payload }) => {
        state.error = payload || null;
      }),
});

export const shopsReducer = shopsSlice.reducer;
