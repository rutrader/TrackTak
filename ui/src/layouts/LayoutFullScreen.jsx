import { Container } from "@material-ui/core";
import { selectGeneral } from "@tracktak/dcf-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import TTTabs from "../components/TTTabs";
import {
  getFundamentalsThunk,
  getLastPriceCloseThunk,
  getTenYearGovernmentBondLastCloseThunk,
} from "../redux/thunks/fundamentalsThunks";

const LayoutFullScreen = ({ children, countryISO, ticker }) => {
  const dispatch = useDispatch();
  const general = useSelector(selectGeneral);

  useEffect(() => {
    dispatch(
      getLastPriceCloseThunk({
        ticker,
      }),
    );

    // For the fallback if the stock has not been SSR
    const fetchGovernmentBond = async (fundamentalsPromise) => {
      if (countryISO) {
        dispatch(
          getTenYearGovernmentBondLastCloseThunk({
            countryISO,
          }),
        );
      } else {
        const { payload } = await fundamentalsPromise;

        dispatch(
          getTenYearGovernmentBondLastCloseThunk({
            countryISO: payload.general.countryISO,
          }),
        );
      }
    };

    const fundamentalsPromise = dispatch(
      getFundamentalsThunk({
        ticker,
      }),
    );

    fetchGovernmentBond(fundamentalsPromise);
  }, [countryISO, dispatch, ticker]);

  return (
    <Container maxWidth={false}>
      <Header />
      {general ? children : null}
      <TTTabs />
    </Container>
  );
};

export default LayoutFullScreen;
