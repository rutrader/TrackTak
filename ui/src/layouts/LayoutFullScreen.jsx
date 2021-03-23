import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import TTTabs from "../components/TTTabs";
import {
  getFundamentalsThunk,
  getLastPriceCloseThunk,
  getTenYearGovernmentBondLastCloseThunk,
} from "../redux/thunks/fundamentalsThunks";

const LayoutFullScreen = ({ children, ticker }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getLastPriceCloseThunk({
        ticker,
      }),
    );

    const fetchGovernmentBond = async () => {
      const { payload } = await dispatch(
        getFundamentalsThunk({
          ticker,
        }),
      );

      dispatch(
        getTenYearGovernmentBondLastCloseThunk({
          countryISO: payload.general.countryISO,
        }),
      );
    };

    fetchGovernmentBond();
  }, [dispatch, ticker]);

  return (
    <Container maxWidth={false}>
      <Header />
      {children}
      <TTTabs />
    </Container>
  );
};

export default LayoutFullScreen;
