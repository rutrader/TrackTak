import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fundamentalsFilter } from "../api/api";
import Header from "../components/Header";
import { getFundamentalsThunk } from "../redux/actions/fundamentalsActions";

const LayoutFullScreen = ({ children }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const fundamentals = useSelector((state) => state.fundamentals);

  useEffect(() => {
    dispatch(
      getFundamentalsThunk({
        ticker: params.ticker,
        filter: fundamentalsFilter,
      })
    );
  }, [dispatch, params.ticker]);

  if (!fundamentals.data) return null;

  return (
    <Container maxWidth={false}>
      <Header />
      {children}
    </Container>
  );
};

export default LayoutFullScreen;
