import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store.ts';

export interface CartState {
  cart: string[];
}

const initialState: CartState = {
  cart: [],
};

export const selectCartItems = (state: RootState) => state.cart.cart;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.cart = [...state.cart, payload];
    },
    clearCart: (state) => {
      state.cart = [];
    },
    removeFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((id) => id !== payload);
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
