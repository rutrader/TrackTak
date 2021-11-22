import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Autocomplete,
  useMediaQuery,
  useTheme
} from '@mui/material'
import dayjs from 'dayjs'
import SearchIcon from '@mui/icons-material/Search'
import {
  useDebouncedCallback,
  TTRoundInput,
  api,
  snackbarActions,
  useCurrentPlan,
  useAuth
} from '@tracktak/common'
import { convertSubCurrencyToCurrency } from '@tracktak/financial-model'
import { useDispatch } from 'react-redux'
import isStockDisabled from '../shared/isStockDisabled'
import getSymbolFromCurrency from 'currency-symbol-map'
import { useNavigate } from 'react-router'
import logSpreadsheetEvent from '../shared/logSpreadsheetEvent'

const SearchTickerDialog = ({
  templatePromise,
  open,
  onClose,
  isSmallSearch,
  sx
}) => {
  const theme = useTheme()
  const [autoComplete, setAutoComplete] = useState([])
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false)
  const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [text, setText] = useState('')
  const { userData, getAccessToken } = useAuth()
  const { currentPlan } = useCurrentPlan()
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

  const getAutoCompleteDebounced = useDebouncedCallback(async value => {
    const { data } = await api.getAutocompleteQuery(
      `${value}?limit=9&type=stock`
    )
    setIsLoadingAutocomplete(false)
    setAutoComplete(data.value)
  }, 300)

  const handleOnChangeAutoComplete = (_, value) => {
    if (isStockDisabled(currentPlan, value)) {
      return
    }

    if (value?.code && value?.exchange) {
      const ticker = `${value.code}.${value.exchange}`

      createUserSpreadsheet(ticker)
    }
  }

  const handleOnChangeSearch = async e => {
    const value = e.target.value

    setText(value)

    if (value.length > 0) {
      setIsLoadingAutocomplete(true)
      getAutoCompleteDebounced(value)
    }
  }

  useEffect(() => {
    if (text.length === 0) {
      setAutoComplete([])
    }
  }, [text])

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
        <Box sx={{ display: 'flex', position: 'relative', ...sx }}>
          <Autocomplete
            style={{ flex: 1 }}
            open={text.length > 0}
            onChange={handleOnChangeAutoComplete}
            getOptionLabel={({ name, code, exchange }) => {
              return `${name} (${code}.${exchange})`
            }}
            getOptionSelected={(option, value) => {
              return (
                option.code === value.code && option.exchange === value.exchange
              )
            }}
            getOptionDisabled={option => isStockDisabled(currentPlan, option)}
            autoComplete
            options={autoComplete.map(option => {
              return {
                name: option.Name,
                code: option.Code,
                exchange: option.Exchange,
                isMediumCapUSPlus: option.isMediumCapUSPlus
              }
            })}
            autoHighlight
            loading={isLoadingAutocomplete}
            popupIcon={null}
            onBlur={() => {
              setText('')
            }}
            clearIcon={null}
            renderInput={params => {
              return (
                <Box
                  sx={{
                    maxWidth: '850px',
                    margin: '0 auto'
                  }}
                >
                  <TTRoundInput
                    {...params}
                    isSmallInput={isSmallSearch}
                    variant='outlined'
                    onChange={handleOnChangeSearch}
                    placeholder={isOnMobile ? 'Search' : 'Search, e.g. AAPL'}
                    InputProps={{
                      ...params.InputProps,
                      color: 'secondary',
                      startAdornment: (
                        <IconButton
                          name='Submit Company Search'
                          sx={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            position: 'absolute',
                            right: 0,
                            height: '100%'
                          }}
                          type='submit'
                        >
                          <SearchIcon color='primary' />
                        </IconButton>
                      )
                    }}
                  />
                </Box>
              )
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default SearchTickerDialog
