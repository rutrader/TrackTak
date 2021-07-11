import { useState, useEffect } from "react";
import { saveValuation } from "../api/api";
import { useAuth } from "./useAuth";

const usePersistSpreadsheet = (ticker, spreadsheetDataToSave, sheetId) => {
  const { session, isAuthenticated } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function persistSpreadsheetData() {
      await saveValuation(
        { name: ticker, data: spreadsheetDataToSave, sheetId },
        session?.getAccessToken()?.jwtToken,
      );
      setIsSaving(false);
    }
    if (isAuthenticated && ticker && spreadsheetDataToSave) {
      setIsSaving(true);
      persistSpreadsheetData();
    }
  }, [spreadsheetDataToSave, ticker]);

  return [ isSaving ];
};

export default usePersistSpreadsheet;
