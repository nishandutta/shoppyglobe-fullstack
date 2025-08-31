import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiAddToCart,
  apiRemoveFromCart,
  apiUpdateCartItem,
  apiClearCart,
  apiFetchCart,
} from "../../services/api";

// --- Async Thunks ---
export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  return await apiFetchCart();
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }) => await apiAddToCart({ productId, quantity })
);

export const updateCart = createAsyncThunk(
  "cart/update",
  async ({ productId, quantity }) => await apiUpdateCartItem({ productId, quantity })
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId) => await apiRemoveFromCart(productId)
);

export const clearCart = createAsyncThunk("cart/clear", async () => {
  return await apiClearCart();
});

// --- Slice ---
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null, // { user, items: [] }
    status: "idle",
    error: null,
  },
  reducers: {
    resetCart(state) {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const commonPending = (state) => {
      state.status = "loading";
    };
    const commonFulfilled = (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    };
    const commonRejected = (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    };

    builder
      .addCase(fetchCart.pending, commonPending)
      .addCase(fetchCart.fulfilled, commonFulfilled)
      .addCase(fetchCart.rejected, commonRejected)

      .addCase(addToCart.pending, commonPending)
      .addCase(addToCart.fulfilled, commonFulfilled)
      .addCase(addToCart.rejected, commonRejected)

      .addCase(updateCart.pending, commonPending)
      .addCase(updateCart.fulfilled, commonFulfilled)
      .addCase(updateCart.rejected, commonRejected)

      .addCase(removeFromCart.pending, commonPending)
      .addCase(removeFromCart.fulfilled, commonFulfilled)
      .addCase(removeFromCart.rejected, commonRejected)

      .addCase(clearCart.pending, commonPending)
      .addCase(clearCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = { items: [] }; // force reset
        state.error = null;
      })
      .addCase(clearCart.rejected, commonRejected);
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
