import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContentfulEntries } from "../../api/api";

export const getDCFTemplateEntries = createAsyncThunk(
  "contentful/getDCFTemplateEntries",
  async () => {
    const res = await getContentfulEntries({
      content_type: "dcfTemplate",
    });
    return res.data;
  }
);
