import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import axios from "../axios/axios";

const Valuation = () => {
  const params = useParams();
  const [entry, setEntry] = useState();

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await axios.get(`/api/v1/contentful/getEntry/${params.id}`);

        setEntry(res.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    fetchStockData();
  }, [params.id]);

  return "Valuation";
};

export default Valuation;
