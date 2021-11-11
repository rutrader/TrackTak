import React, { useState } from 'react'
import {
  Button,
  TextField,
  Grid,
  Typography,
  useTheme,
  Box
} from '@mui/material'
import { RoundButton } from '@tracktak/common'
import SocialLoginButtons from './SocialLoginButtons'
import { ContinueToSpreadsheet } from './SignUpForm'

const SignInForm = ({
  onSubmit,
  onSwitchToSignUpClick,
  onSwitchToForgotPasswordClick
}) => {
  const theme = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(e, {
      email,
      password
    })
  }

  return (
    <Box
      sx={{
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
        Sign in
      </Typography>
      <ContinueToSpreadsheet />
      <SocialLoginButtons />
      <Box
        sx={{
          marginTop: theme.spacing(3)
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item xs={12}>
              <TextField
                onChange={e => setEmail(e.target.value)}
                variant='outlined'
                required
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
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
                label='Password'
                type='password'
                id='password'
                helperText={
                  <Button
                    color='primary'
                    disableRipple
                    sx={{
                      textTransform: 'none'
                    }}
                    onClick={onSwitchToForgotPasswordClick}
                    type='button'
                  >
                    Forgot Password?
                  </Button>
                }
                autoComplete='current-password'
                sx={{
                  display: 'flex',
                  '& .MuiFormHelperText-root': {
                    marginLeft: 0
                  }
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
              margin: theme.spacing(1, 0, 2),
              fontWeight: 'bold'
            }}
          >
            Sign In
          </RoundButton>
          <Grid container justify='flex-end'>
            <Grid item>
              <Button
                color='primary'
                disableRipple
                sx={{
                  textTransform: 'none',
                  fontWeight: 'bold'
                }}
                onClick={onSwitchToSignUpClick}
                type='button'
              >
                Don't have an account? Sign up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}

export default SignInForm
