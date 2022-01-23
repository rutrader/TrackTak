import React, { useContext, createContext } from 'react'
import { useParams } from 'react-router-dom'

const SpreadsheetContext = createContext()

export const ProvideSpreadsheetsMetadata = ({ value, children }) => {
  return (
    <SpreadsheetContext.Provider value={value}>
      {children}
    </SpreadsheetContext.Provider>
  )
}

export const useSpreadsheetsMetadata = () => {
  const { defaultFolderId, folders } = useContext(SpreadsheetContext)

  const params = useParams()
  const folderId = params.folderId ?? defaultFolderId

  return {
    folderId,
    folders
  }
}
