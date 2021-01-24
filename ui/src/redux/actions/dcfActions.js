import { createAction } from "@reduxjs/toolkit";

export const updateCells = createAction(
  "dcf/updateCells",
  (cellsToUpdate, scope) => {
    return {
      payload: {
        cellsToUpdate,
        scope,
      },
    };
  }
);
