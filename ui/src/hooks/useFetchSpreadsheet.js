import { useState, useEffect } from "react";
import { getSpreadsheet } from "../api/api";
import { useAuth } from "./useAuth";

const useFetchSpreadsheet = (sheetId) => {
  const { getAccessToken } = useAuth();
  const [spreadsheetData, setSpreadsheetData] = useState();

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken();
      const response = await getSpreadsheet(token?.jwtToken, sheetId);

      setSpreadsheetData(response.data.spreadsheet);
    }

    fetchData();
  }, [getAccessToken, sheetId]);

  return [spreadsheetData];
};

export default useFetchSpreadsheet;
