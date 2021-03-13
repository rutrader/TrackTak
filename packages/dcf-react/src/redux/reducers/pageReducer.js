import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const pageReducer = createReducer(initialState, (builder) => {
  builder.addMatcher(
    (action) => action.type.endsWith("/fulfilled"),
    (state) => {
      state.isLoading = false;
    }
  );
  builder.addMatcher(
    (action) => action.type.endsWith("/rejected"),
    (state) => {
      state.isLoading = false;
    }
  );
  builder.addMatcher(
    (action) => action.type.endsWith("/pending"),
    (state) => {
      state.isLoading = true;
    }
  );
});
