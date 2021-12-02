import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { utils, useCurrentPlan, api, useAuth } from '@tracktak/common'
import {
  Divider,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  Stack
} from '@mui/material'
import ContactDetailsForm from './ContactDetailsForm'
import SettingSection from './SettingsSection'
import ChangePasswordForm from './ChangePasswordForm'
import CurrentPlan from './CurrentPlan'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LockIcon from '@mui/icons-material/Lock'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PaymentIcon from '@mui/icons-material/Payment'
import ConfirmationDialog from './ConfirmationDialog'
import ClearIcon from '@mui/icons-material/Clear'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import FreezeModalForm from './FreezeModalForm'
import AcUnit from '@mui/icons-material/AcUnit'
import { useNavigate } from 'react-router-dom'

const AccountSettings = () => {
  const { getAccessToken } = useAuth()
  const navigate = useNavigate()
  const { isExternalIdentityProvider } = useAuth()
  const { currentPlan, updatePlan } = useCurrentPlan()
  const [showFreezePlanDialog, setShowFreezePlanDialog] = useState(false)
  const [endPlanDialog, setEndPlanDialog] = useState(false)
  const [freezeOption, setFreezeOption] = useState('1')
  const hasPaymentPlan =
    currentPlan?.isFrozen || currentPlan?.priceIds?.length > 0

  const dividerStyle = {
    marginTop: 4,
    marginBottom: 4
  }

  const planExpiration = currentPlan?.periodEnd
    ? new Date(currentPlan.periodEnd).toLocaleDateString()
    : ''

  const handleFreezePlanDialogClose = () => {
    setShowFreezePlanDialog(false)
  }

  const handleFreezePlanDialogConfirm = () => {
    updatePlan({
      state: 'freeze',
      monthsToFreeze: freezeOption
    })
    setShowFreezePlanDialog(false)
  }

  const handleEndPlanDialogClose = () => {
    setEndPlanDialog(false)
  }

  const handleEndPlanDialogConfirm = () => {
    updatePlan({
      state: 'freeze',
      monthsToFreeze: freezeOption
    })
    setEndPlanDialog(false)
  }

  const handleUnfreezePlanButtonClick = () => {
    updatePlan({
      state: 'unfreeze'
    })
  }

  const handleOnClickCustomerPortal = async () => {
    const token = await getAccessToken()
    const { data } = await api.createCustomerPortal(token?.jwtToken)

    window.location.href = data.url
  }

  const handleAddRegionsClick = async () => {
    navigate('/pricing')
  }

  return (
    <>
      <Helmet>
        <title>{utils.getTitle('Account Settings')}</title>
        <link rel='canonical' href={`${utils.resourceName}/account-settings`} />
        <meta name='description' content='Account Settings.' />
      </Helmet>
      <Paper
        sx={{
          padding: theme =>
            `${theme.spacing(4)} ${theme.spacing(4)} ${theme.spacing(
              8
            )} ${theme.spacing(4)}`
        }}
      >
        <Typography variant='h5' gutterBottom>
          Account Settings
        </Typography>
        <Divider light sx={dividerStyle} />
        {process.env.PREMIUM_ENABLED === 'true' && (
          <>
            <Grid container justifyContent='space-between'>
              <Grid item xs={12} sm={5}>
                <SettingSection
                  heading='Current Plan'
                  sx={{
                    position: 'relative'
                  }}
                  icon={
                    <CheckCircleIcon
                      fontSize='large'
                      color='action'
                      sx={{
                        mr: 0.5,
                        color: theme => theme.palette.primary.light
                      }}
                    />
                  }
                >
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{
                      textTransform: 'none'
                    }}
                    startIcon={<AutoAwesomeIcon />}
                    onClick={handleAddRegionsClick}
                  >
                    Upgrade Regions
                  </Button>
                  {hasPaymentPlan && (
                    <Typography
                      sx={{
                        color: theme => theme.palette.secondary.grey
                      }}
                      variant='h8'
                      gutterBottom
                    >
                      {currentPlan?.isFrozen && 'Plan Frozen'}
                      <br />${currentPlan?.totalCost}/mo. Auto-renews on{' '}
                      {planExpiration}
                    </Typography>
                  )}
                  <CurrentPlan currentPlan={currentPlan} />
                </SettingSection>
              </Grid>
              <Divider
                orientation='vertical'
                light
                flexItem
                sx={dividerStyle}
              />
              <Grid item xs={12} sm={5}>
                <SettingSection
                  heading='Payment Method'
                  icon={
                    <PaymentIcon
                      fontSize='large'
                      color='action'
                      sx={{
                        mr: 0.5,
                        color: theme => theme.palette.primary.light
                      }}
                    />
                  }
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      mt: 3
                    }}
                  >
                    {hasPaymentPlan && (
                      <Typography variant='h6' gutterBottom>
                        **** **** **** {currentPlan?.paymentCardLast4}
                      </Typography>
                    )}
                    <Button
                      fullWidth
                      variant='contained'
                      color='primary'
                      sx={{
                        textTransform: 'none',
                        mt: 3
                      }}
                      onClick={handleOnClickCustomerPortal}
                      disabled={!hasPaymentPlan}
                    >
                      Update Details
                    </Button>
                  </Box>
                </SettingSection>
              </Grid>
            </Grid>
            <Divider light sx={dividerStyle} />
          </>
        )}
        <Grid container justifyContent='space-between'>
          <Grid item xs={12} sm={5}>
            <SettingSection
              heading='Your Profile'
              subHeading='Contact Details'
              icon={
                <AccountBoxIcon
                  fontSize='large'
                  color='action'
                  sx={{
                    mr: 0.5,
                    color: theme => theme.palette.primary.light
                  }}
                />
              }
            >
              <ContactDetailsForm />
            </SettingSection>
          </Grid>
          {!isExternalIdentityProvider && (
            <>
              <Divider
                orientation='vertical'
                light
                flexItem
                sx={dividerStyle}
              />
              <Grid item xs={12} sm={5}>
                <SettingSection
                  heading='Security'
                  subHeading='Change Password'
                  icon={
                    <LockIcon
                      fontSize='large'
                      color='action'
                      sx={{
                        mr: 0.5,
                        color: theme => theme.palette.primary.light
                      }}
                    />
                  }
                >
                  <ChangePasswordForm />
                </SettingSection>
              </Grid>
            </>
          )}
        </Grid>
        {process.env.PREMIUM_ENABLED === 'true' && (
          <>
            <Divider light sx={dividerStyle} />
            <Stack
              spacing={2}
              direction='row'
              sx={{ justifyContent: 'space-around' }}
            >
              {currentPlan?.isFrozen && (
                <Button
                  startIcon={<AcUnit />}
                  sx={{
                    textTransform: 'none'
                  }}
                  onClick={handleUnfreezePlanButtonClick}
                >
                  Unfreeze Plan
                </Button>
              )}
              {hasPaymentPlan && (
                <Button
                  startIcon={<ClearIcon />}
                  sx={{
                    textTransform: 'none'
                  }}
                  onClick={() => {
                    setEndPlanDialog(true)
                  }}
                >
                  End Plan
                </Button>
              )}
            </Stack>
            <ConfirmationDialog
              open={endPlanDialog}
              onCancel={() => navigate('/switching-plan')}
              onClose={handleEndPlanDialogClose}
              onConfirm={handleEndPlanDialogConfirm}
              confirmText='Freeze My Plan'
              cancelText='Continue to Cancel'
            >
              <FreezeModalForm
                header='Before you cancel...'
                setFreezeOption={setFreezeOption}
                subtext={
                  <Typography
                    variant='h6'
                    sx={{
                      color: theme => theme.palette.primary.mainTextColor
                    }}
                    gutterBottom
                  >
                    Did you know you can put your plan on hold?
                  </Typography>
                }
                currentPlan={currentPlan}
              />
            </ConfirmationDialog>
            <ConfirmationDialog
              open={showFreezePlanDialog}
              onClose={handleFreezePlanDialogClose}
              onCancel={handleFreezePlanDialogClose}
              onConfirm={handleFreezePlanDialogConfirm}
              confirmText='Freeze My Plan'
              cancelText='Cancel'
            >
              <FreezeModalForm
                setFreezeOption={setFreezeOption}
                header='Need a break from investing?'
                currentPlan={currentPlan}
              />
            </ConfirmationDialog>
          </>
        )}
      </Paper>
    </>
  )
}

export default AccountSettings
