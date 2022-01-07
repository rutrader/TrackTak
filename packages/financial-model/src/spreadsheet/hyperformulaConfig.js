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
  // We use our own undo/redo instead
  undoLimit: 0,
  timeoutTime: 10000,
  licenseKey: 'gpl-v3'
}
