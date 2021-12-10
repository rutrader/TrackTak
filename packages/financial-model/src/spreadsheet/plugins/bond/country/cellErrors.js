import { CellError, ErrorType } from '@tracktak/hyperformula'
import countryCodes from './countryCodes'

const countryCodesString = countryCodes.join(', ')

export const countryCodeCellError = new CellError(
  ErrorType.VALUE,
  `countryCode is not valid. The valid country codes are: ${countryCodesString}.`
)

export const maturityCellError = new CellError(
  ErrorType.VALUE,
  `maturity is not valid. Format must be {number}yr|m.`
)
