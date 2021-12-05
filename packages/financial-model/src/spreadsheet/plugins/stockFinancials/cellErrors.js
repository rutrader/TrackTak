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
  `ticker is not valid. Format must be {ticker} for US companies or {ticker.exchange} for non-us companies. The list of valid exchanges is: ${stockExchangesString}.`
)

export const attributesCellError = new CellError(
  ErrorType.VALUE,
  `attribute is not valid. Must be one of these attributes: ${allAttributesString}.`
)

export const typeCellError = new CellError(
  ErrorType.VALUE,
  `type is not valid. Must be one of these attributes: "ttm", "quarterly" or "annual".`
)

export const fiscalDateCellError = new CellError(
  ErrorType.VALUE,
  `fiscalDate is not valid. Must be in this format: ">{YYYY}/{MM}/{DD}" (more than), "<{YYYY}/{MM}/{DD}" (less than) or "{YYYY}/{MM}/{DD};{YYYY}/{MM}/{DD}" (between).`
)
