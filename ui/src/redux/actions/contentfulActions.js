import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const getDCFTemplateEntries = createAsyncThunk(
  "contentful/getDCFTemplateEntries",
  async () => {
    try {
      const res = await axios.get(
        `/api/v1/contentful/getEntries?content_type=dcfTemplate`
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
