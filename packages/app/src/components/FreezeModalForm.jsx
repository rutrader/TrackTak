import React from 'react'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FreezeModalForm = ({ header, subtext, setFreezeOption, currentPlan }) => {
  const theme = useTheme()
  const isOnMobile = useMediaQuery(theme.breakpoints.up('sm'))

  const handleOptionChange = (_, e) => {
    setFreezeOption(e)
  }

  const planExpiration = currentPlan?.periodEnd
    ? new Date(currentPlan.periodEnd).toLocaleDateString()
    : ''

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: isOnMobile ? theme.spacing(7) : 0,
        paddingRight: isOnMobile ? theme.spacing(7) : 0
      }}
    >
      <Typography
        variant='h4'
        sx={{
          mt: theme.spacing(2),
          color: theme.palette.primary.mainTextColor,
          fontWeight: 'bold'
        }}
        gutterBottom
      >
        {header}
      </Typography>
      {subtext}
      <Box
        sx={{
          mt: 3
        }}
      >
        <FormControl component='fieldset'>
          <FormLabel
            component='legend'
            sx={{
              fontWeight: 'bold',
              color: 'black '
            }}
          >
            How long would you like to freeze your plan?
          </FormLabel>
          <RadioGroup
            aria-label='freeze time'
            defaultValue='1'
            name='freeze-plan-radio-buttons-group'
            row
            onChange={handleOptionChange}
          >
            <FormControlLabel value='1' control={<Radio />} label='1 month' />
            <FormControlLabel value='2' control={<Radio />} label='2 months' />
            <FormControlLabel value='3' control={<Radio />} label='3 months' />
          </RadioGroup>
        </FormControl>
        <Typography
          sx={{
            fontWeight: 'bold',
            mt: 1
          }}
        >
          Freeze start date
        </Typography>
        <Typography>
          Your membership will freeze from your next payment date,{' '}
          {planExpiration} and you won’t be charged.
        </Typography>
        <Typography
          sx={{
            fontWeight: 'bold',
            mt: 1
          }}
        >
          Unfreezing your plan
        </Typography>
        <Typography>Unfreeze your membership at any time.</Typography>
        <Typography
          sx={{
            mt: 3,
            fontSize: theme => theme.typography.fontSize4
          }}
        >
          Please note that unfreezing before the original end date, means there
          is a small charge amount will be added on to your next payment to
          cover the days. After you have used your 1 or 3-month allowance you no
          longer can freeze you plan within a 12-month period.
        </Typography>
      </Box>
    </Box>
  )
}

export default FreezeModalForm
