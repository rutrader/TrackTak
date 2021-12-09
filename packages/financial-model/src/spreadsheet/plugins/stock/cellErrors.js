import { CellError, ErrorType } from '@tracktak/hyperformula'
import stockExchanges from './stockExchanges'

const stockExchangesString = stockExchanges
  .map(exchange => `"${exchange}"`)
  .join(', ')

// TODO: Change to specific error types when we modify HF to allow
// custom error language types to be registered & put these as a
// generic error in HF.
export const tickerCellError = new CellError(
  ErrorType.VALUE,
  `ticker is not valid. Format must be {SYMBOL} for US companies or {SYMBOL.EXCHANGE} for non-us companies. The list of valid exchanges is: ${stockExchangesString}.`
)

export const getFieldsCellError = allFieldsString =>
  new CellError(
    ErrorType.VALUE,
    `field is not valid. Must be one of these fields: ${allFieldsString}.`
  )
