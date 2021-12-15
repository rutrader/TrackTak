import express from 'express'
import { isNil } from 'lodash-es'
import { getFundamentals } from './stockApi'

const router = express.Router()

const getInterestCoverage = statement => {
  const { operatingIncome, interestExpense } = statement

  if (isNil(operatingIncome) || isNil(interestExpense)) return null
  if (interestExpense === 0) return Infinity
  if (operatingIncome < 0) return -Infinity

  // Cap it to 0 otherwise the coverage will be wrong.
  const cappedInterestExpense = Math.max(interestExpense, 0)

  return operatingIncome / cappedInterestExpense
}

const getIncomeStatementRatios = statement => {
  return {
    date: statement.date,
    interestCoverage: getInterestCoverage(statement)
  }
}

router.get('/:ticker', async (req, res) => {
  const { general, financials } = await getFundamentals(
    req.params.ticker,
    req.query
  )

  const ratios = {
    quarterly: [],
    yearly: []
  }

  financials.incomeStatement.quarterly.forEach((statement, i) => {
    ratios.quarterly.push({
      ...(ratios.quarterly[i] ? ratios.quarterly[i] : {}),
      ...getIncomeStatementRatios(statement)
    })
  })

  financials.incomeStatement.yearly.forEach((statement, i) => {
    ratios.yearly.push({
      ...(ratios.yearly[i] ? ratios.yearly[i] : {}),
      ...getIncomeStatementRatios(statement)
    })
  })

  const value = {
    general,
    ratios
  }

  res.send({ value })
})

export default router
