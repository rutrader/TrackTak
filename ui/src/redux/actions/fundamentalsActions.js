import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const getFundamentals = createAsyncThunk(
  "fundamentals/getFundamentals",
  async (ticker) => {
    const res = await axios.get(`/api/v1/get-fundamentals/${ticker}`);
    return res.data;
  }
);
