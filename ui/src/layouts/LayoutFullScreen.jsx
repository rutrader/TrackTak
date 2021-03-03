import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fundamentalsFilter } from "../api/api";
import Header from "../components/Header";
import TTTabs from "../components/TTTabs";
import {
  getFundamentalsThunk,
  getLastPriceCloseThunk,
  getTenYearGovernmentBondLastCloseThunk,
} from "../redux/thunks/fundamentalsThunks";

const LayoutFullScreen = ({
  children,
  stockFundamentals: { General, ticker },
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getFundamentalsThunk({
        ticker,
        filter: fundamentalsFilter,
      }),
    );

    dispatch(
      getTenYearGovernmentBondLastCloseThunk({
        countryISO: General.CountryISO,
      }),
    );

    dispatch(
      getLastPriceCloseThunk({
        ticker,
      }),
    );
  }, [General.CountryISO, dispatch, ticker]);

  return (
    <Container maxWidth={false}>
      <Header />
      {children}
      <TTTabs ticker={ticker} />
    </Container>
  );
};

export default LayoutFullScreen;
