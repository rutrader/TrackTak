import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import dayjs from 'dayjs'
import { api, snackbarActions, useAuth, SearchTicker } from '@tracktak/common'
import { convertSubCurrencyToCurrency } from '@tracktak/financial-model'
import { useDispatch } from 'react-redux'
import getSymbolFromCurrency from 'currency-symbol-map'
import { useNavigate } from 'react-router'
import logSpreadsheetEvent from '../shared/logSpreadsheetEvent'

const SearchTickerDialog = ({ templatePromise, open, onClose }) => {
  const { userData, getAccessToken } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const createUserSpreadsheet = async ticker => {
    const values = await Promise.all([
      getAccessToken(),
      templatePromise,
      api.getFundamentals(ticker, {
        filter: 'General::CurrencyCode'
      })
    ])

    const token = values[0]
    const template = values[1].data.template

    Object.keys(template.cells).forEach(key => {
      const cellData = template.cells[key]
      const currencyCode = convertSubCurrencyToCurrency(values[2].data.value)
      const currencySymbol = getSymbolFromCurrency(currencyCode)

      if (cellData.dynamicFormat === 'currency') {
        template.cells[key].textFormatPattern =
          currencySymbol + cellData.textFormatPattern
      }
    })
    const sheetData = {
      name: ticker,
      data: template
    }
    const response = await api.createSpreadsheet(
      { sheetData, ticker },
      token?.jwtToken
    )

    const spreadsheet = response.data.spreadsheet

    navigate(`/${userData.name}/my-spreadsheets/${spreadsheet._id}`)

    dispatch(
      snackbarActions.setMessage({
        severity: 'success',
        message: `${ticker}'s financial data has been frozen to ${dayjs().format(
          'DD MMM YYYY'
        )} for your valuation.`
      })
    )
    logSpreadsheetEvent('Create', spreadsheet.sheetData.name)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      PaperProps={{
        style: {
          padding: '25px',
          marginTop: '-40vh'
        }
      }}
    >
      <DialogTitle id='form-dialog-title'>
        Search for the company that you want to value.
      </DialogTitle>
      <DialogContent>
        <SearchTicker setTicker={createUserSpreadsheet} />
      </DialogContent>
    </Dialog>
  )
}

export default SearchTickerDialog
