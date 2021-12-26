import { CellError, ErrorType } from '@tracktak/hyperformula'

export const maturityCellError = new CellError(
  ErrorType.VALUE,
  `maturity is not valid. Format must be {number}yr|m.`
)
