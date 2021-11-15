import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Box
} from '@mui/material'
import { useCurrentPlan } from '@tracktak/common'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MembershipButtons from './MembershipButtons'
import CancellationPlan from './CancellationPlan'
import { useNavigate } from 'react-router-dom'

const listOfFeatures = [
  { feature: 'Small-cap United States API region access' },
  { feature: 'Access to Worldwide API region' },
  { feature: 'Priority email and call support' }
]

const CancelPlan = () => {
  const theme = useTheme()
  const { updatePlan } = useCurrentPlan()
  const navigate = useNavigate()

  const handleEndMyMembershipClick = () => {
    updatePlan({
      state: 'cancel'
    })
    navigate('/')
  }

  return (
    <>
      <CancellationPlan
        route='/switching-plan'
        iconArrow={<ArrowBackIcon />}
        header='We are sorry to see you go!'
        bodyText={
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              mb: 4
            }}
          >
            <Typography gutterBottom variant='h5' fontWeight='bold'>
              Please confirm the cancellation of your plan
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <WarningAmberIcon sx={{ color: theme.palette.warning.main }} />
              <Typography
                gutterBottom
                sx={{ color: theme.palette.warning.main }}
              >
                Your benefits will remain active until your billing period ends
                on Thur, 14 October 2021.
              </Typography>
            </Box>
            <Typography
              gutterBottom
              variant='h6'
              fontWeight='bold'
              sx={{ mt: 4 }}
            >
              Benefits you will lose:
            </Typography>
            <List>
              {listOfFeatures.map((feature, index) => {
                return (
                  <ListItem sx={{ paddingTop: '0px' }} key={index}>
                    <ListItemIcon sx={{ minWidth: '33px' }}>
                      <CheckIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary={feature.feature} />
                  </ListItem>
                )
              })}
            </List>
          </Grid>
        }
      />
      <MembershipButtons onEndMyMembershipClick={handleEndMyMembershipClick} />
    </>
  )
}

export default CancelPlan
