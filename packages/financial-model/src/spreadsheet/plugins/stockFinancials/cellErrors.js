import { CellError, ErrorType } from '@tracktak/hyperformula'
import { allAttributes } from './attributes'
import stockExchanges from './stockExchanges'

const stockExchangesString = stockExchanges
  .map(exchange => `"${exchange}"`)
  .join(', ')

const allAttributesString = allAttributes
  .map(attribute => `"${attribute}"`)
  .join(', ')

// TODO: Change to specific error types when we modify HF to allow
// custom error language types to be registered & put these as a
// generic error in HF.
export const tickerCellError = new CellError(
  ErrorType.VALUE,
  `ticker is not valid. Format must be {SYMBOL} for US companies or {SYMBOL.EXCHANGE} for non-us companies. The list of valid exchanges is: ${stockExchangesString}.`
)

export const attributesCellError = new CellError(
  ErrorType.VALUE,
  `attribute is not valid. Must be one of these attributes: ${allAttributesString}.`
)

export const granularityCellError = new CellError(
  ErrorType.VALUE,
  `granularity is not valid. Must be one of these attributes: "ttm", "quarterly" or "yearly".`
)

export const fiscalDateRangeCellError = new CellError(
  ErrorType.VALUE,
  `fiscalDateRange is not valid. Must be in this format: ">{YYYY}/{MM}" (more than), "<{YYYY}/{MM}" (less than) or "{YYYY}/{MM};{YYYY}/{MM}" (between).`
)
