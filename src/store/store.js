import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dataSlice from "../redux/dataSlice";
import authSlice from "../redux/authSlice";

const rootReducer = combineReducers({
  data: dataSlice,
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
