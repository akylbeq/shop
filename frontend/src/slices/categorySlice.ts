import { Category, ErrorResponse } from '../types.ts';
import { createSlice } from '@reduxjs/toolkit';
import { createCategory, fetchCategories } from '../thunks/categoryThunk.ts';
import { RootState } from '../app/store.ts';

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: ErrorResponse | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const selectAdminCategories = (state: RootState) =>
  state.category.categories;
export const selectCategoriesError = (state: RootState) => state.category.error;

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || null;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload;
      })
      .addCase(fetchCategories.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || null;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
