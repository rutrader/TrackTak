import { CellError, ErrorType } from '@tracktak/hyperformula'

export const granularityCellError = new CellError(
  ErrorType.VALUE,
  `granularity is not valid. Must be one of these fields: "ttm", "quarter" or "year".`
)
