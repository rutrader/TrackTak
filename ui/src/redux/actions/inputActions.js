import { createAction } from "@reduxjs/toolkit";

export const setValue = createAction("input/setValue", (key, value) => {
  return {
    payload: {
      key,
      value,
    },
  };
});
