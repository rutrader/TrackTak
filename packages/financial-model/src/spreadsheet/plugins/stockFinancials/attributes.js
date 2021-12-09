import {
  balanceSheet,
  cashFlowStatement,
  incomeStatement
} from './financialStatements'

const getMappedArrayAttributes = financialSecurityAttribute => {
  return financialSecurityAttribute.map(attribute => {
    return attribute
  })
}

export const fullStatementAttributes = [
  'incomeStatement',
  'balanceSheet',
  'cashFlowStatement'
]

export const incomeStatementAttributes =
  getMappedArrayAttributes(incomeStatement)

export const balanceSheetAttributes = getMappedArrayAttributes(balanceSheet)

export const cashFlowStatementAttributes =
  getMappedArrayAttributes(cashFlowStatement)

export const allAttributes = [
  ...fullStatementAttributes,
  ...incomeStatementAttributes,
  ...balanceSheetAttributes,
  ...cashFlowStatementAttributes
]
