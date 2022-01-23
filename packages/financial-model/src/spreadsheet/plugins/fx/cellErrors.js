import { CellError, ErrorType } from '@tracktak/hyperformula'
import currencyCodes from './currencyCodes'

const currencyCodesString = currencyCodes.join(', ')

export const baseCurrencyCellError = new CellError(
  ErrorType.VALUE,
  `baseCurrency is not valid. The valid currencies are: ${currencyCodesString}.`
)

export const quoteCurrencyCellError = new CellError(
  ErrorType.VALUE,
  `quoteCurrency is not valid. The valid currencies are: ${currencyCodesString}.`
)
