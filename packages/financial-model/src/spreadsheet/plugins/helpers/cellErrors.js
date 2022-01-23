import { CellError, ErrorType } from '@tracktak/hyperformula'
import { currencySymbolMap } from 'currency-symbol-map'

const currencyCodesString = Object.keys(currencySymbolMap).join(', ')

export const currencyCodeCellError = new CellError(
  ErrorType.VALUE,
  `currencyCode is not valid. The valid currencies are: ${currencyCodesString}.`
)
