import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import TTTabs from "../components/TTTabs";
import {
  getFundamentalsThunk,
  getLastPriceCloseThunk,
} from "../redux/thunks/fundamentalsThunks";
import selectFundamentalsIsLoaded from "../selectors/selectIsFundamentalsLoaded";

const LayoutFullScreen = ({ children, ticker }) => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectFundamentalsIsLoaded);

  useEffect(() => {
    dispatch(
      getFundamentalsThunk({
        ticker,
      }),
    );

    dispatch(
      getLastPriceCloseThunk({
        ticker,
      }),
    );
  }, [dispatch, ticker]);

  return isLoaded ? (
    <Container maxWidth={false}>
      <Header />
      {children}
      <TTTabs />
    </Container>
  ) : null;
};

export default LayoutFullScreen;
