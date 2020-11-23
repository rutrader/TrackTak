import { createAction } from "@reduxjs/toolkit";

export const setEmployeeOptionsValue = createAction(
  "employeeOptions/setValue",
  (key, value) => {
    return {
      payload: {
        key,
        value,
      },
    };
  }
);
