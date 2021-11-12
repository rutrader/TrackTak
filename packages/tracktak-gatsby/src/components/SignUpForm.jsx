import React, { useState } from 'react'
import {
  Checkbox,
  Box,
  FormControlLabel,
  Link,
  Button,
  TextField,
  Grid,
  useTheme,
  Typography
} from '@mui/material'
import { RoundButton } from '@tracktak/common'
import SocialLoginButtons from './SocialLoginButtons'

const BoxWrapper = ({ sx, ...props }) => {
  return (
    <Box
      sx={{
        mt: 2,
        ...sx
      }}
      {...props}
    />
  )
}

export const ContinueToSpreadsheet = () => {
  return (
    <Typography variant='h7' color='textSecondary' gutterBottom>
      Continue to your Spreadsheet
    </Typography>
  )
}

const SignUpForm = ({ onSubmit, onSwitchToSignInClick }) => {
  const theme = useTheme()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkedMailingList, setCheckedMailingList] = useState(false)

  const handleSubmit = e => {
    onSubmit(e, {
      name,
      email,
      password,
      checkedMailingList
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
        Create your Account
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
                onChange={e => setName(e.target.value)}
                autoComplete='name'
                name='name'
                variant='outlined'
                required
                id='name'
                label='Name'
                autoFocus
                sx={{
                  display: 'flex'
                }}
              />
            </Grid>
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
                autoComplete='current-password'
                InputProps={{ inputProps: { minLength: 8 } }}
                sx={{
                  display: 'flex'
                }}
              />
            </Grid>
          </Grid>
          <BoxWrapper>
            <FormControlLabel
              checked={checkedMailingList}
              onChange={e => {
                setCheckedMailingList(e.target.checked)
              }}
              control={<Checkbox color='primary' />}
              label={
                <Typography>
                  Occasionally send me updates on new features
                </Typography>
              }
            />
          </BoxWrapper>
          <BoxWrapper>
            <Typography
              variant='h7'
              color='textSecondary'
              sx={{ fontSize: '14px' }}
            >
              By clicking Sign Up, you agree to our{' '}
              <Link
                href='/terms-and-conditions'
                rel='noreferrer'
                target='_blank'
              >
                Terms
              </Link>{' '}
              and that you have read our{' '}
              <Link href='/privacy-policy' rel='noreferrer' target='_blank'>
                Privacy Policy
              </Link>
              , including our{' '}
              <Link href='/cookie-policy' rel='noreferrer' target='_blank'>
                Cookie Policy
              </Link>
              .
            </Typography>
          </BoxWrapper>
          <RoundButton
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            sx={{
              margin: theme.spacing(3, 0, 2),
              fontWeight: 'bold'
            }}
          >
            Create account
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
                onClick={onSwitchToSignInClick}
                type='button'
              >
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}

export default SignUpForm
