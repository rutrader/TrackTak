import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import axios from "../axios/axios";
import { getFundamentals } from "../redux/actions/fundamentalsActions";
import CompanyOverviewStats from "../components/CompanyOverviewStats";
import { Typography } from "@material-ui/core";
import ValueDrivingInputs from "../components/ValueDrivingInputs";

const Valuation = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [contentfulData, setContentfulData] = useState();
  const fundamentals = useSelector((state) => state.fundamentals);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const contentfulData = await axios.get(
          `/api/v1/contentful/getEntry/${params.id}`
        );
        dispatch(getFundamentals(contentfulData.data.fields.ticker));
        setContentfulData(contentfulData.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    fetchStockData();
  }, [dispatch, params.id]);

  if (!fundamentals.data || !contentfulData) return null;

  const { fields } = contentfulData;

  return (
    <>
      <CompanyOverviewStats />
      <Typography variant="h5" gutterBottom>
        Business Description
      </Typography>
      <Typography paragraph>{fields.businessDescription}</Typography>
      <ValueDrivingInputs />
    </>
  );
};

export default Valuation;
