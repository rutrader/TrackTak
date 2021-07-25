import React, { createContext, useMemo, useState, useContext } from "react";

const SpreadsheetContext = createContext();

export const ProvideSpreadsheet = (props) => {
  const [spreadsheet, setSpreadsheet] = useState();
  const spreadsheetContextValue = useMemo(() => {
    return {
      spreadsheet,
      setSpreadsheet,
    };
  }, [spreadsheet]);

  return (
    <SpreadsheetContext.Provider value={spreadsheetContextValue}>
      {props.children}
    </SpreadsheetContext.Provider>
  );
};

export const useSpreadsheet = () => {
  return useContext(SpreadsheetContext);
};
