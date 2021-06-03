import { Container, useTheme } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import TTTabs from "../components/TTTabs";
import {
  getFundamentalsThunk,
  getLastPriceCloseThunk,
} from "../redux/thunks/fundamentalsThunks";
import selectFundamentalsIsLoaded from "../selectors/selectIsFundamentalsLoaded";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const LayoutFullScreen = ({ children, ticker }) => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  let padding;

  if (isOnMobile) {
    padding = {
      paddingLeft: "0px",
      paddingRight: "0px",
    };
  }

  return isLoaded ? (
    <Container
      sx={{
        ...padding,
      }}
      maxWidth={false}
    >
      <Header />
      {children}
      <TTTabs />
    </Container>
  ) : null;
};

export default LayoutFullScreen;
