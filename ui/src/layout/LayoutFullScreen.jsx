import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fundamentalsFilter } from "../api/api";
import Header from "../components/Header";
import TTTabs from "../components/TTTabs";
import { getFundamentalsThunk } from "../redux/actions/fundamentalsActions";

const LayoutFullScreen = ({ children }) => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getFundamentalsThunk({
        ticker: params.ticker,
        filter: fundamentalsFilter,
      })
    );
  }, [dispatch, params.ticker]);

  return (
    <Container maxWidth={false}>
      <Header />
      {children}
      <TTTabs />
    </Container>
  );
};

export default LayoutFullScreen;
