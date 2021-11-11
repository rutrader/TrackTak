import React from 'react'
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { utils, useFetchPrice } from '@tracktak/common'

const ListRegion = ({
  iconSvg,
  regionName,
  checked,
  handleOnChangeChecked,
  disabled,
  priceId
}) => {
  const theme = useTheme()
  const priceData = useFetchPrice(priceId)
  const isOnMobile = useMediaQuery(theme.breakpoints.up('sm'))

  const formattedPrice = priceData ? (
    <>
      {utils.formatPrice({
        unitAmount: priceData.unit_amount,
        currency: priceData.currency.toUpperCase()
      })}
      /{priceData?.recurring.interval}
    </>
  ) : null

  return (
    <ListItem>
      <ListItemButton
        sx={{
          paddingTop: 0,
          paddingBottom: 0,
          flexWrap: 'wrap',
          justifyContent: 'left'
        }}
        onClick={disabled ? null : handleOnChangeChecked}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ListItemIcon
            sx={{
              height: '30px'
            }}
          >
            <img src={iconSvg} alt='' width={30} height={30} />
          </ListItemIcon>
          <ListItemText primary={regionName} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: isOnMobile ? 'right' : 'center',
            marginLeft: '16px',
            marginRight: '-11px',
            alignItems: 'center'
          }}
        >
          {formattedPrice}
          <Checkbox
            edge='end'
            checked={checked}
            sx={{ marginRight: '-12px' }}
            inputProps={{ 'aria-label': 'controlled' }}
            disabled={disabled}
          />
        </Box>
      </ListItemButton>
    </ListItem>
  )
}

export default ListRegion
