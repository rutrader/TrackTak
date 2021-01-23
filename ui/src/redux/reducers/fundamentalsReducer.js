import { createReducer } from "@reduxjs/toolkit";
import {
  setExchangeRate,
  setFundamentalsDataThunk,
  setLastPriceClose,
  setTenYearGovernmentBondLastClose,
} from "../actions/fundamentalsActions";
import equityRiskPremiumCountriesJson from "../../data/equityRiskPremiumCountries.json";
import industryMapping, { spaceRegex } from "../../shared/industryMappings";
import industryAverage from "../../shared/industryAverage";
import selectIsInUS from "../../selectors/selectIsInUS";

const initialState = {
  currentIndustry: null,
  currentEquityRiskPremiumCountry: null,
  governmentBondTenYearLastClose: null,
  priceLastClose: null,
  data: null,
  isLoaded: false,
  exchangeRates: null,
  mostRecentExchangeRate: null,
};

const setFundamentalsReducer = (state, action) => {
  state.data = action.payload.data;
};

const setLastPriceCloseReducer = (state, action) => {
  const priceLastClose = action.payload;

  state.priceLastClose = priceLastClose;
};

const setCurrentIndustryAverageReducer = (state) => {
  const currentIndustryMutated = state.data.General.Industry.replace(
    spaceRegex,
    ""
  ).toUpperCase();
  const mappedCurrentIndustry = industryMapping[currentIndustryMutated];
  const industryAverages = selectIsInUS({ fundamentals: { data: state.data } })
    ? industryAverage.US
    : industryAverage.global;
  const currentIndustry = industryAverages.find((datum) => {
    return datum.industryName === mappedCurrentIndustry;
  });

  state.currentIndustry = {
    ...currentIndustry,
    standardDeviationInStockPrices:
      currentIndustry.standardDeviationInStockPrices,
  };
};

const setCurrentEquityRiskPremiumReducer = (state) => {
  const {
    corporateTaxRate,
    countryRiskPremium,
    equityRiskPremium,
    adjDefaultSpread,
  } = equityRiskPremiumCountriesJson.find((datum) => {
    const country = datum.country.toUpperCase();

    return country === state.data.General.AddressData.Country.toUpperCase();
  });

  state.currentEquityRiskPremiumCountry = {
    corporateTaxRate: parseFloat(corporateTaxRate) / 100,
    countryRiskPremium: parseFloat(countryRiskPremium) / 100,
    equityRiskPremium: parseFloat(equityRiskPremium) / 100,
    adjDefaultSpread: parseFloat(adjDefaultSpread) / 100,
  };
};

const setGovernmentBondTenYearLastCloseReducer = (
  state,
  { payload = null }
) => {
  state.governmentBondTenYearLastClose = payload;
};

const setExchangeRateReducer = (state, { payload = {} }) => {
  const values = Object.values(payload);

  if (values.length) {
    state.exchangeRates = payload;
    state.mostRecentExchangeRate = values[0];
  }
};

export const fundamentalsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLastPriceClose, setLastPriceCloseReducer);
  builder.addCase(setFundamentalsDataThunk.pending, (state) => {
    state.isLoaded = false;
  });
  builder.addCase(setFundamentalsDataThunk.fulfilled, (state, action) => {
    setFundamentalsReducer(state, action);
    setCurrentEquityRiskPremiumReducer(state, action);
    setCurrentIndustryAverageReducer(state, action);
    state.isLoaded = true;
  });
  builder.addCase(
    setTenYearGovernmentBondLastClose,
    setGovernmentBondTenYearLastCloseReducer
  );
  builder.addCase(setExchangeRate, setExchangeRateReducer);
});
