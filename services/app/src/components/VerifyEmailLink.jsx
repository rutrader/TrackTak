import React from 'react'
import { Box, Link } from '@mui/material'
import { utils, snackbarActions, useAuth } from '@tracktak/common'
import { useDispatch } from 'react-redux'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

const VerifyEmailLink = ({ text, ...props }) => {
  const { sendEmailVerification, isEmailVerified, userData } = useAuth()
  const dispatch = useDispatch()

  const handleVerificationCodeError = err => {
    dispatch(
      snackbarActions.setMessage({
        message: 'Failed to send verification link',
        severity: 'error'
      })
    )
  }

  const handleVerificationEmailSent = () => {
    dispatch(
      snackbarActions.setMessage({
        message: 'A verification link has been sent to your email.'
      })
    )
  }

  const handleClickVerifyEmail = () => {
    sendEmailVerification(
      userData.email,
      handleVerificationEmailSent,
      utils.noop,
      handleVerificationCodeError
    )
  }

  return isEmailVerified ? null : (
    <>
      <Box
        {...props}
        sx={{
          display: 'flex',
          alignItems: 'center',
          ...props.sx
        }}
      >
        <WarningAmberIcon
          fontSize='small'
          color='action'
          sx={{
            mr: theme => theme.spacing(0.5),
            color: theme => theme.palette.warning.main
          }}
        />
        <Link
          component='button'
          type='button'
          underline='always'
          variant='caption'
          onClick={handleClickVerifyEmail}
          sx={{
            color: theme => theme.palette.warning.main,
            fontSize: theme => theme.typography.button.fontSize4,
            textAlign: 'left'
          }}
        >
          {text}
        </Link>
      </Box>
    </>
  )
}

export default VerifyEmailLink
