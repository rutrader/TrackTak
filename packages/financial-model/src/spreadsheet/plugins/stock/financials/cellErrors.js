import { CellError, ErrorType } from '@tracktak/hyperformula'

export const granularityCellError = new CellError(
  ErrorType.VALUE,
  `granularity is not valid. Must be one of these fields: "ttm", "quarterly" or "yearly".`
)

export const fiscalDateRangeCellError = new CellError(
  ErrorType.VALUE,
  `fiscalDateRange is not valid. Must be in this format: ">{YYYY}/{MM}" (more than), "<{YYYY}/{MM}" (less than) or "{YYYY}/{MM};{YYYY}/{MM}" (between).`
)
