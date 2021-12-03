import React, { useEffect, useState } from 'react'
import {
  Box,
  IconButton,
  Autocomplete,
  useMediaQuery,
  useTheme
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {
  useDebouncedCallback,
  TTRoundInput,
  api,
  useCurrentPlan
} from '@tracktak/common'
import isStockDisabled from '../shared/isStockDisabled'

const SearchTicker = ({ setTicker }) => {
  const theme = useTheme()
  const [autoComplete, setAutoComplete] = useState([])
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false)
  const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [text, setText] = useState('')
  const { currentPlan } = useCurrentPlan()

  const getAutoCompleteDebounced = useDebouncedCallback(async value => {
    const { data } = await api.getSecuritiesAutocomplete(
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

      setTicker(ticker)
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
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Autocomplete
        style={{ flex: 1 }}
        open={text.length > 0}
        onChange={handleOnChangeAutoComplete}
        getOptionLabel={({ name, code, exchange }) => {
          return `${name} (${code}.${exchange})`
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
  )
}

export default SearchTicker
