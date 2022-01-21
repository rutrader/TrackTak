import { AlwaysSparse } from '@tracktak/hyperformula'
import { currencySymbolMap } from 'currency-symbol-map'

const trueNamedExpression = {
  name: 'TRUE',
  expression: '=TRUE()'
}

const falseNamedExpression = {
  name: 'FALSE',
  expression: '=FALSE()'
}

export const namedExpressions = [trueNamedExpression, falseNamedExpression]

export const config = {
  chooseAddressMappingPolicy: new AlwaysSparse(),
  timeoutTime: 10000,
  licenseKey: 'gpl-v3',
  currencySymbol: Object.values(currencySymbolMap)
}
