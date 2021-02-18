import { createReducer } from "@reduxjs/toolkit";
import { getDCFTemplateEntries } from "../actions/contentfulActions";

const initialState = {
  entries: null,
};

export const contentfulReducer = createReducer(initialState, (builder) => {
  builder.addCase(getDCFTemplateEntries.fulfilled, (state, action) => {
    state.entries = action.payload;
  });
});
