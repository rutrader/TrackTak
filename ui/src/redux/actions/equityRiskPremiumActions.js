import { createAction } from "@reduxjs/toolkit";

export const setCurrentEquityRiskPremium = createAction(
  "equityRiskPremium/setCurrentEquityRiskPremium",
  (currentCountry) => {
    return {
      payload: {
        currentCountry,
      },
    };
  }
);
