import { useState } from "react";
import { saveSpreadsheet } from "../api/api";
import { useAuth } from "./useAuth";

const usePersistSpreadsheet = (sheetId) => {
  const { getAccessToken } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const persistSpreadsheetData = async (name, data) => {
    setIsSaving(true);
    const token = await getAccessToken();
    await saveSpreadsheet({ name, data, sheetId }, token?.jwtToken);
    setIsSaving(false);
  };

  return { isSaving, persistSpreadsheetData };
};

export default usePersistSpreadsheet;
