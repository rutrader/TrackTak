import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Grid } from '@mui/material'
import { useAuth } from '@tracktak/auth'
import { useDispatch } from 'react-redux'
import { snackbarActions } from '@tracktak/common'
import VerifyEmailLink from './VerifyEmailLink'

const ContactDetailsForm = () => {
  const { userData, updateContactDetails, isExternalIdentityProvider } =
    useAuth()
  const [name, setName] = useState(userData?.name)
  const [email, setEmail] = useState(userData?.email)
  const [isDirty, setIsDirty] = useState(false)
  const dispatch = useDispatch()

  const handleFieldChange = (e, setter) => {
    const value = e.target.value
    setter(value)
    setIsDirty(true)
  }

  useEffect(() => {
    if (name === userData?.name && email === userData?.email) {
      setIsDirty(false)
    }
  }, [name, email, userData])

  useEffect(() => {
    if (userData) {
      setName(userData.name)
      setEmail(userData.email)
    }
  }, [userData])

  const handleSuccess = () => {
    dispatch(
      snackbarActions.setMessage({
        message: 'Successfully updated your details',
        severity: 'success'
      })
    )
  }

  const handleError = err => {
    dispatch(
      snackbarActions.setMessage({
        message: err?.message,
        severity: 'error'
      })
    )
  }

  const handleSubmit = e => {
    e.preventDefault()
    updateContactDetails(
      {
        name: name ?? userData?.name,
        email: email ?? userData.email
      },
      handleSuccess,
      handleError
    )
  }

  return (
    <Box
      sx={{
        display: 'flex'
      }}
    >
      <form style={{ width: '100%' }} onSubmit={handleSubmit}>
        <Grid
          container
          direction='column'
          justifyContent='space-between'
          gap={3}
        >
          <Grid item xs={12} sm={4}>
            <TextField
              value={name || ''}
              onChange={e => handleFieldChange(e, setName)}
              variant='outlined'
              required
              fullWidth
              id='name'
              label='Name'
              name='name'
              autoComplete='name'
              size='small'
              disabled={isExternalIdentityProvider}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              value={email || ''}
              onChange={e => handleFieldChange(e, setEmail)}
              variant='outlined'
              required
              fullWidth
              name='email'
              label='Email'
              type='email'
              id='email'
              autoComplete='email'
              size='small'
              disabled={isExternalIdentityProvider}
            />
            <VerifyEmailLink
              sx={{
                mb: 1,
                mt: 1
              }}
              text='Click here to verify your email!'
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              sx={{
                textTransform: 'none'
              }}
              disabled={!isDirty}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default ContactDetailsForm
