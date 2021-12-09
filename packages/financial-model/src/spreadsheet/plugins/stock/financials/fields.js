import {
  balanceSheet,
  cashFlowStatement,
  incomeStatement
} from '../financialStatements'

export const financialStatementFields = [
  'incomeStatement',
  'balanceSheet',
  'cashFlowStatement'
]

export const fields = [
  ...financialStatementFields,
  ...incomeStatement,
  ...balanceSheet,
  ...cashFlowStatement
]
