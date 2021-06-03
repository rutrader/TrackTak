import { createAction } from "@reduxjs/toolkit";

export const setSheetsValues = createAction("dcf/setSheetsValues");
export const setSheetsSerializedValues = createAction(
  "dcf/setSheetsSerializedValues",
);
export const setCells = createAction("dcf/setCells");
export const setScope = createAction("dcf/setScope");
