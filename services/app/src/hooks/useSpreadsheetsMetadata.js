import React, { useContext, createContext } from 'react'

const SpreadsheetContext = createContext()

export const ProvideSpreadsheetsMetadata = ({ value, children }) => {
  return (
    <SpreadsheetContext.Provider value={value}>
      {children}
    </SpreadsheetContext.Provider>
  )
}

export const useSpreadsheetsMetadata = () => {
  return useContext(SpreadsheetContext)
}
