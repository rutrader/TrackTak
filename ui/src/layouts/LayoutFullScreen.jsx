import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import TTTabs from "../components/TTTabs";
import {
  getFundamentalsThunk,
  getLastPriceCloseThunk,
  getTenYearGovernmentBondLastCloseThunk,
} from "../redux/thunks/fundamentalsThunks";
import selectFundamentalsIsLoaded from "../selectors/selectIsFundamentalsLoaded";

const LayoutFullScreen = ({ children, ticker }) => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectFundamentalsIsLoaded);

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
      {isLoaded ? children : null}
      <TTTabs />
    </Container>
  );
};

export default LayoutFullScreen;
