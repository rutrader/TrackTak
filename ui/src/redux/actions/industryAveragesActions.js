import { createAction } from "@reduxjs/toolkit";

export const setCurrentIndustryAverage = createAction(
  "industryAverages/setCurrentIndustryAverage",
  (currentIndustry) => {
    return {
      payload: {
        currentIndustry,
      },
    };
  }
);
