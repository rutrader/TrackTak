import { createAsyncThunk } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import {
  getExchangeRate,
  getFundamentals,
  getGovernmentBond,
  getPrices
} from '../../api/api'
import convertSubCurrencyToCurrency from '../../shared/convertSubCurrencyToCurrency'
import getMinimumHistoricalDateFromFinancialStatements from '../../shared/getMinimumHistoricalDateFromFinancialStatements'

const yearMonthDateFormat = 'YYYY-MM'
const fundamentalsFilter =
  'General,Highlights,SharesStats,Financials::Balance_Sheet,Financials::Income_Statement,Financials::Cash_Flow'

export const getExchangeRatesThunk = createAsyncThunk(
  'fundamentals/getExchangeRates',
  async ({ currencyCode, incomeStatement, balanceSheet, params }) => {
    const baseCurrency = balanceSheet.currencyCode
    const quoteCurrency = currencyCode
    // UK stocks are quoted in pence so we convert it to GBP for ease of use
    const convertedBaseCurrency = convertSubCurrencyToCurrency(baseCurrency)
    const convertedQuoteCurrency = convertSubCurrencyToCurrency(quoteCurrency)
    const from = dayjs(
      getMinimumHistoricalDateFromFinancialStatements(
        incomeStatement,
        balanceSheet
      )
    ).format(yearMonthDateFormat)

    if (convertedBaseCurrency !== convertedQuoteCurrency) {
      const { data } = await getExchangeRate(
        convertedBaseCurrency,
        convertedQuoteCurrency,
        {
          ...params,
          period: 'm',
          from
        }
      )

      return data.value
    }
    return {}
  }
)

export const getTenYearGovernmentBondLastCloseThunk = createAsyncThunk(
  'fundamentals/getTenYearGovernmentBondLastCloseThunk',
  async ({ countryISO, params }) => {
    const { data } = await getGovernmentBond(`${countryISO}10Y`, {
      ...params,
      filter: 'last_close'
    })

    return data.value / 100
  }
)

export const getLastPriceCloseThunk = createAsyncThunk(
  'fundamentals/getLastPriceClose',
  async ({ ticker, params }) => {
    const { data } = await getPrices(ticker, {
      ...params,
      filter: 'last_close'
    })

    return data.value
  }
)

export const getFundamentalsThunk = createAsyncThunk(
  'fundamentals/getFundamentals',
  async ({ ticker, params }) => {
    const { data } = await getFundamentals(ticker, {
      ...params,
      filter: fundamentalsFilter
    })

    return data.value
  }
)
