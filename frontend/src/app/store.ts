import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '../containers/client/Cart/cartSlice.ts';
import { userReducer } from '../slices/userSlice.ts';
import { categoryReducer } from '../slices/categorySlice.ts';
import { productsReducer } from '../slices/productsSlice.ts';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    category: categoryReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
