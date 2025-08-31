import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetchProducts, apiFetchProductById } from "../../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async () => await apiFetchProducts()
);

export const fetchProduct = createAsyncThunk(
  "products/fetchOne",
  async (id) => await apiFetchProductById(id)
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    current: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // list
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // single
      .addCase(fetchProduct.pending, (state) => {
        state.current = null;
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
