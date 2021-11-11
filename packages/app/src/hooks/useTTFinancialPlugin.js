import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { api } from '@tracktak/common'
import { convertStockAPIData, thunks } from '@tracktak/financial-model'
import { useAuth } from '@tracktak/auth'

export const useTTFinancialPlugin = spreadsheet => {
  const [financialData, setFinancialData] = useState()
  const dispatch = useDispatch()
  const { getAccessToken } = useAuth()

  useEffect(() => {
    const { id, ticker } = spreadsheet?.financialData ?? {}

    const fetchData = async callback => {
      const { data } = await callback()

      setFinancialData(data.financialData)
    }

    if (id) {
      const fetchFinancials = async () => {
        return await api.getFinancialData(id)
      }

      fetchData(fetchFinancials)
    } else if (ticker) {
      const fetchCreateNewFinancials = async () => {
        const { payload: fundamentals } = await dispatch(
          thunks.getFundamentalsThunk({
            ticker
          })
        )

        const values = await Promise.all([
          dispatch(
            thunks.getExchangeRatesThunk({
              currencyCode: fundamentals.general.currencyCode,
              incomeStatement: fundamentals.incomeStatement,
              balanceSheet: fundamentals.balanceSheet
            })
          ),
          dispatch(
            thunks.getLastPriceCloseThunk({
              ticker
            })
          ),

          dispatch(
            thunks.getTenYearGovernmentBondLastCloseThunk({
              countryISO: fundamentals.general.countryISO
            })
          ),
          getAccessToken()
        ])

        const financialData = convertStockAPIData(
          fundamentals,
          values[0].payload,
          values[1].payload,
          values[2].payload
        )

        const token = values[3]

        return await api.createFinancialData(
          financialData,
          token?.jwtToken,
          spreadsheet._id
        )
      }

      fetchData(fetchCreateNewFinancials)
    }
  }, [dispatch, getAccessToken, spreadsheet])

  return financialData
}
