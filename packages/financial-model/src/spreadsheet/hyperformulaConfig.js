import { AlwaysSparse } from '@tracktak/hyperformula'

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
  licenseKey: 'gpl-v3'
}
