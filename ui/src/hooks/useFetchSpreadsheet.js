import { useState, useEffect } from "react";
import { getSpreadsheet } from "../api/api";
import { getAccessToken } from "./useAuth";

const useFetchSpreadsheet = (sheetId) => {
  const [spreadsheet, setSpreadsheet] = useState();
  const [financialData, setFinancialData] = useState();
  const [accessToken, setAccessToken] = useState();
  const jwtToken = accessToken?.jwtToken;

  useEffect(() => {
    async function fetchToken() {
      const token = await getAccessToken();

      setAccessToken(token);
    }
    fetchToken();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await getSpreadsheet(jwtToken, sheetId);

      setFinancialData(response.data.financialData);
      setSpreadsheet(response.data.spreadsheet);
    }

    fetchData();
  }, [jwtToken, sheetId]);

  return [spreadsheet, financialData];
};

export default useFetchSpreadsheet;
