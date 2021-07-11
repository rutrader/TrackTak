import { useState, useEffect } from "react";
import { getValuation } from "../api/api";
import { useAuth } from "./useAuth";

const useFetchSpreadsheet = (sheetId) => {
  const { session, isAuthenticated } = useAuth();
  const [spreadsheetData, setSpreadsheetData] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await getValuation(
        session?.getAccessToken()?.jwtToken,
        sheetId,
      );
      setSpreadsheetData(response.data.valuation);
    }
    if (isAuthenticated) {
      fetchData();
    }
  }, [session, isAuthenticated, sheetId]);

  return [spreadsheetData];
};

export default useFetchSpreadsheet;
