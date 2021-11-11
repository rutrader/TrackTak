import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  TextField,
  Grid,
  Typography,
  useTheme,
  Alert,
  Box
} from '@mui/material'
import {
  api,
  trackTakLogoIcon,
  utils,
  RoundButton,
  useAuth
} from '@tracktak/common'

const ForgotPasswordForm = ({ onCancelClick }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { sendEmailVerification } = useAuth()
  const [verificationEmailSent, setVerificationEmailSent] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handlePasswordResetFailure = err => {
    dispatch(
      api.setMessage({
        message: err?.message,
        severity: 'error'
      })
    )
  }

  const handleVerificationEmailSent = () => {
    setVerificationEmailSent(true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    sendEmailVerification(
      email,
      handleVerificationEmailSent,
      utils.noop,
      handlePasswordResetFailure,
      password
    )
  }

  return (
    <>
      {verificationEmailSent && (
        <Alert severity='info'>
          Please check your email for the Forgot Password link
        </Alert>
      )}
      <Box
        sx={{
          marginTop: theme.spacing(5),
          marginBottom: theme.spacing(5),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <img src={trackTakLogoIcon} alt='tracktak' />
        <Typography
          variant='h4'
          sx={{
            mt: theme.spacing(2),
            color: theme.palette.primary.mainTextColor
          }}
          gutterBottom
        >
          Forgot password
        </Typography>
        <Box
          sx={{
            marginTop: theme.spacing(3)
          }}
        >
          <form onSubmit={handleSubmit} validate='true'>
            <Grid container spacing={2} justifyContent='center'>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  disabled={verificationEmailSent}
                  onChange={e => setEmail(e.target.value)}
                  sx={{
                    display: 'flex'
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={e => setPassword(e.target.value)}
                  variant='outlined'
                  required
                  name='password'
                  label='New Password'
                  type='password'
                  id='password'
                  InputProps={{ inputProps: { minLength: 8 } }}
                  sx={{
                    display: 'flex'
                  }}
                />
              </Grid>
            </Grid>
            <RoundButton
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              sx={{
                margin: theme.spacing(3, 0, 2),
                textTransform: 'none'
              }}
            >
              Send Reset Email
            </RoundButton>
            <RoundButton
              fullWidth
              variant='outlined'
              color='primary'
              onClick={onCancelClick}
              type='button'
              sx={{
                textTransform: 'none'
              }}
            >
              Cancel
            </RoundButton>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default ForgotPasswordForm
