import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const getFinancials = createAsyncThunk(
  "financials/getFinancials",
  async (symbol) => {
    const res = await axios.get(`/api/v1/get-financials/${symbol}`);
    return res.data;
  }
);
