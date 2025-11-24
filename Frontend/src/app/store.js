import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../src/features/auth/authSlice';
import productReducer from '../../src/features/products/productsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});