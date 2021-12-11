import { CellError, ErrorType } from '@tracktak/hyperformula'
import exchanges from './exchanges'

const exchangesString = exchanges.join(', ')

// TODO: Change to specific error types when we modify HF to allow
// custom error language types to be registered & put these as a
// generic error in HF.
export const tickerCellError = new CellError(
  ErrorType.VALUE,
  `ticker is not valid. Format must be {SYMBOL} for US companies or {SYMBOL.EXCHANGE} for non-us companies. The valid exchanges are: ${exchangesString}.`
)

export const granularityCellError = new CellError(
  ErrorType.VALUE,
  `granularity is not valid. Must be one of these fields: "ttm", "quarter" or "year".`
)
