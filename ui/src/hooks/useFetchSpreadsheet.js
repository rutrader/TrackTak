import { useState, useEffect } from "react";
import { getSpreadsheet } from "../api/api";
import { useAuth } from "./useAuth";

const useFetchSpreadsheet = (sheetId) => {
  const [spreadsheet, setSpreadsheet] = useState();
  const { getAccessToken } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken();
      const response = await getSpreadsheet(sheetId, token?.jwtToken);

      setSpreadsheet(response.data.spreadsheet);
    }

    fetchData();
  }, [getAccessToken, sheetId]);

  return spreadsheet;
};

export default useFetchSpreadsheet;
