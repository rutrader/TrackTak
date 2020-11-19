import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getFinancials } from "../redux/actions/financialsActions";

const Valuation = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFinancials(params.symbol));
  }, [dispatch, params.symbol]);

  return <div>Valuation</div>;
};

export default Valuation;
