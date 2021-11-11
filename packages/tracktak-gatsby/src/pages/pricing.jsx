import { Box, Link, Typography, useTheme } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { utils, api, regions, useCurrentPlan } from '@tracktak/common'
import { useAuth } from '@tracktak/auth'
import FormGroup from '@material-ui/core/FormGroup'
import SelectAPIRegion from '../components/SelectAPIRegion'
import FrequentlyAskedQuestion from '../components/FrequentlyAskedQuestion'

const Pricing = () => {
  const theme = useTheme()
  const { getAccessToken } = useAuth()
  const { currentPlan } = useCurrentPlan()
  const [checked, setChecked] = useState([])
  const [disabled, setDisabled] = useState([])

  const handleOnClick = async () => {
    // TODO: Redirect to signup here instead if user not logged in
    const token = await getAccessToken()
    const apiRegionLineItems = checked
      .filter(priceId => priceId !== regions.PriceIds.MEDIUM_CAP_US_PLUS)
      .map(priceId => {
        return { price: priceId, quantity: 1 }
      })
    const lineItems = [...apiRegionLineItems]
    const { data } = await api.createCheckoutSession(lineItems, token?.jwtToken)

    window.location.href = data.url
  }

  useEffect(() => {
    if (currentPlan?.priceIds) {
      const currentStocks = [
        regions.PriceIds.MEDIUM_CAP_US_PLUS,
        ...currentPlan?.priceIds
      ]
      setChecked(currentStocks)
      setDisabled(currentStocks)
    }
  }, [currentPlan])

  return (
    <>
      <Helmet>
        <title>{utils.getTitle('Pricing')}</title>
        <link rel='canonical' href={`${utils.resourceName}/pricing`} />
        <meta name='description' content='Pricing Plan.' />
      </Helmet>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          color={theme.palette.primary.purple}
          fontWeight='bold'
          variant='h3'
          gutterBottom
        >
          Plans and Pricing
        </Typography>
        <Typography
          sx={{
            color: theme.palette.primary.mainTextColor,
            marginBottom: theme.spacing(2)
          }}
          variant='h4'
        >
          Choose a region that works for you.
        </Typography>
        <FormGroup>
          <Typography
            sx={{ marginTop: theme.spacing(2) }}
            color='textSecondary'
          >
            For business plans are only available by contacting sales:{' '}
            <Link href='mailto:support@tracktak.com'>support@tracktak.com</Link>
            .
          </Typography>
        </FormGroup>
      </Box>
      <SelectAPIRegion
        disabled={disabled}
        checked={checked}
        setChecked={setChecked}
        handleOnClick={handleOnClick}
      />
      <FrequentlyAskedQuestion />
    </>
  )
}

export default Pricing
