import { Button, Typography, Box, useTheme } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { globeIcon, api, useFetchPrice, utils, regions } from '@tracktak/common'
import { useAuth } from '@tracktak/auth'
import MembershipButtons from './MembershipButtons'
import CancellationPlan from './CancellationPlan'

const SwitchingPlan = () => {
  const theme = useTheme()
  const { getAccessToken } = useAuth()
  const priceData = useFetchPrice(regions.PriceIds.WORLDWIDE)

  const handleOnClick = async () => {
    const token = await getAccessToken()
    const lineItems = [{ price: regions.PriceIds.WORLDWIDE, quantity: 1 }]

    const { data } = await api.createCheckoutSession(lineItems, token?.jwtToken)

    window.location.href = data.url
  }

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
    <>
      <CancellationPlan
        route='/account-settings'
        iconArrow={<ArrowBackIcon />}
        header='Consider switching to a worldwide API region.'
        bodyText={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <img
              src={globeIcon}
              alt='worldwide'
              style={{
                height: '37px'
              }}
            />
            <Typography
              gutterBottom
              variant='h5'
              fontWeight='bold'
              sx={{ mt: 2 }}
            >
              Get global API region benefits for less
            </Typography>
            <Typography variant='h6'>
              You will get all regions for only {formattedPrice}.
            </Typography>
            <Button
              variant='contained'
              sx={{
                textTransform: 'none',
                mt: 2,
                mb: 7,
                backgroundColor: theme.palette.primary.purple
              }}
              onClick={handleOnClick}
            >
              Switch to Worldwide Region
            </Button>
          </Box>
        }
      />
      <MembershipButtons route='/cancel-plan' />
    </>
  )
}

export default SwitchingPlan
