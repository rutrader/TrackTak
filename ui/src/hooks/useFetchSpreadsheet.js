import { useState, useEffect } from "react";
import { getValuation } from "../api/api";
import { useAuth } from "./useAuth";

const useFetchSpreadsheet = (sheetId) => {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [spreadsheetData, setSpreadsheetData] = useState();

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken();
      const response = await getValuation(
        token?.jwtToken,
        sheetId,
      );
      setSpreadsheetData(response.data.valuation);
    }
    if (isAuthenticated) {
      fetchData();
    }
  }, [getAccessToken, isAuthenticated, sheetId]);

  return [spreadsheetData];
};

export default useFetchSpreadsheet;
