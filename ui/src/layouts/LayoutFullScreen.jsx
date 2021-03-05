import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import TTTabs from "../components/TTTabs";
import {
  getFundamentalsThunk,
  getLastPriceCloseThunk,
  getTenYearGovernmentBondLastCloseThunk,
} from "@tracktak/dcf-react";

const LayoutFullScreen = ({
  children,
  stockFundamentals: { General, ticker },
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getFundamentalsThunk({
        ticker,
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
