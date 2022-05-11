import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./thunks/authThunk";
import { getToken } from "../utils/tokenApi";

const initialState = {
  status: "idle",
  authorized: getToken() || false,
  info: null,
};

export const dataSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut(state) {
      state.authorized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = "loading";
        state.info = null;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.authorized = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "error";
        state.info = action.payload;
      });
  },
});

export const selectLoadingStatus = (state) => state.auth.status === "loading";
export const selectAuthorized = (state) => state.auth.authorized;
export const selectInfo = (state) => state.auth.info;

export const { signOut } = dataSlice.actions;

export default dataSlice.reducer;
