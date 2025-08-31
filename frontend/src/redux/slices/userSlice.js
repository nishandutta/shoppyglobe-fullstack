import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiLogin, apiRegister } from "../../services/api";

const tokenFromStorage = localStorage.getItem("token");

export const registerUser = createAsyncThunk(
  "user/register",
  async (payload) => await apiRegister(payload)
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (payload) => await apiLogin(payload)
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: tokenFromStorage || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        if (action.payload?.token) {
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout, setToken } = userSlice.actions;
export default userSlice.reducer;
