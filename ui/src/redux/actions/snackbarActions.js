import { createAction } from "@reduxjs/toolkit";

export const setMessage = createAction("snackbar/setMessage");

export const clearMessage = createAction("snackbar/clearMessage");
