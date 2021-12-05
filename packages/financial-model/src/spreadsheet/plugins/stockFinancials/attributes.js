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

const getMappedFilteredArrayAttributes = financialSecurityAttribute => {
  const filteredAttributes = financialSecurityAttribute.filter(
    element => element
  )

  return getMappedArrayAttributes(filteredAttributes)
}

export const incomeStatementAttributes =
  getMappedFilteredArrayAttributes(incomeStatement)

export const balanceSheetAttributes =
  getMappedFilteredArrayAttributes(balanceSheet)

export const cashFlowStatementAttributes =
  getMappedFilteredArrayAttributes(cashFlowStatement)

export const allAttributes = [
  ...incomeStatementAttributes,
  ...balanceSheetAttributes,
  ...cashFlowStatementAttributes
]
