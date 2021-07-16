import { useState, useEffect } from "react";
import { getSpreadsheet } from "../api/api";
import { useAuth } from "./useAuth";

const useFetchSpreadsheet = (sheetId) => {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [spreadsheetData, setSpreadsheetData] = useState();

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken();
      const response = await getSpreadsheet(token?.jwtToken, sheetId);
      setSpreadsheetData(response.data.spreadsheet);
    }
    if (isAuthenticated) {
      fetchData();
    }
  }, [getAccessToken, isAuthenticated, sheetId]);

  return [spreadsheetData];
};

export default useFetchSpreadsheet;
