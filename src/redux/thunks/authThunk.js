import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/httpService";
// import axios from "axios";

export const signIn = createAsyncThunk(
  "root/auth",
  async (data, { rejectWithValue }) => {
    const res = await API.post("pse/api/user/login", JSON.stringify(data))
      .then(function (res) {
        const token = res?.data?.data?.token || res?.data?.token || null;
        if (!token) {
          return rejectWithValue(res.data.message || "Cant't sign in");
        }
        return res;
      })
      .catch(function (error) {
        return rejectWithValue("server error");
      });
    return res;
  }
);
