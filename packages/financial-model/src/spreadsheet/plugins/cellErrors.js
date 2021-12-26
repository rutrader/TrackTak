import { CellError, ErrorType } from '@tracktak/hyperformula'

export const fiscalDateRangeExample =
  'Example: "2010-01-01", ">2010-01-01", ">=2010-01-01", "<2020-01-01", <=2020-01-01", "2010-01-01:2015-01-01" (exclusive between)'

export const getFieldCellError = fields =>
  new CellError(
    ErrorType.VALUE,
    `field is not valid. Must be one of these fields: ${fields.join(', ')}.`
  )

export const getCountryISOCellError = countryISOs =>
  new CellError(
    ErrorType.VALUE,
    `countryISO is not valid. The valid country codes are: ${countryISOs.join(
      ', '
    )}.`
  )

export const fiscalDateRangeCellError = new CellError(
  ErrorType.VALUE,
  `fiscalDateRange is not valid. ${fiscalDateRangeExample}`
)

export const noValueReturnedCellError = new CellError(
  ErrorType.NUM,
  'No value was returned for this function call. Try specifying different parameters.'
)
