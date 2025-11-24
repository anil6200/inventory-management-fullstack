import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../products/produtsService';

const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Thunks
export const createProduct = createAsyncThunk('products/create', async (data, thunkAPI) => {
  try { return await productService.createProduct(data); } catch (error) { return thunkAPI.rejectWithValue(error.message); }
});
export const getProducts = createAsyncThunk('products/getAll', async (_, thunkAPI) => {
  try { return await productService.getProducts(); } catch (error) { return thunkAPI.rejectWithValue(error.message); }
});
export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
  try { await productService.deleteProduct(id); return id; } catch (error) { return thunkAPI.rejectWithValue(error.message); }
});
export const updateProduct = createAsyncThunk('products/update', async ({id, data}, thunkAPI) => {
    try { return await productService.updateProduct(id, data); } catch (error) { return thunkAPI.rejectWithValue(error.message); }
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.fulfilled, (state, action) => { state.products.push(action.payload); })
      .addCase(getProducts.fulfilled, (state, action) => { state.products = action.payload; })
      .addCase(updateProduct.fulfilled, (state, action) => {
          const index = state.products.findIndex(p => p._id === action.payload._id);
          state.products[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;