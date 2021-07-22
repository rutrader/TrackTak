import { useState, useEffect } from "react";
import { getSpreadsheet } from "../api/api";
import { getAccessToken } from "./useAuth";

const useFetchSpreadsheet = (sheetId) => {
  const [spreadsheet, setSpreadsheet] = useState();
  const [financialData, setFinancialData] = useState();

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken();
      const response = await getSpreadsheet(token?.jwtToken, sheetId);

      setFinancialData(response.data.financialData);
      setSpreadsheet(response.data.spreadsheet);
    }

    fetchData();
  }, [sheetId]);

  return [spreadsheet, financialData];
};

export default useFetchSpreadsheet;
