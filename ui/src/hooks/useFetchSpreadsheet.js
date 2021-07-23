import { useState, useEffect } from "react";
import { getSpreadsheet } from "../api/api";
import { getAccessToken } from "./useAuth";

const useFetchSpreadsheet = (sheetId) => {
  const [spreadsheet, setSpreadsheet] = useState();

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken();
      const response = await getSpreadsheet(sheetId, token?.jwtToken);

      setSpreadsheet(response.data.spreadsheet);
    }

    fetchData();
  }, [sheetId]);

  return spreadsheet;
};

export default useFetchSpreadsheet;
