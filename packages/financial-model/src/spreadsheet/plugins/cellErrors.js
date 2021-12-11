import { CellError, ErrorType } from '@tracktak/hyperformula'

export const getFieldCellError = fields =>
  new CellError(
    ErrorType.VALUE,
    `field is not valid. Must be one of these fields: ${fields.join(', ')}.`
  )

export const fiscalDateRangeCellError = new CellError(
  ErrorType.VALUE,
  `fiscalDateRange is not valid. Must be in this format: "{YYYY}-{MM}-{DD}" (exact), ">{YYYY}-{MM}-{DD}" (more than), "<{YYYY}-{MM}-{DD}" (less than) or "{YYYY}-{MM}-{DD};{YYYY}-{MM}-{DD}" (between).`
)

export const noValueReturnedCellError = new CellError(
  ErrorType.NUM,
  'No value was returned for this function call. Try specifying different parameters.'
)
