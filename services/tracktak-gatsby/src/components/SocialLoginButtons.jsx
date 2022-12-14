import React from 'react'
import { Grid, Typography, useTheme } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import SocialMediaButton from './SocialMediaButton'

const SocialLoginButtons = () => {
  const theme = useTheme()

  const handleGoogleLogin = () => {
    window.open(process.env.SOCIAL_LOGIN_GOOGLE, '_self')
  }

  const handleFacebookLogin = () => {
    window.open(process.env.SOCIAL_LOGIN_FACEBOOK, '_self')
  }

  return (
    <Grid container justifyContent='center'>
      <Grid
        container
        justifyContent='center'
        sx={{
          gap: theme.spacing(2),
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2)
        }}
      >
        <Grid item onClick={handleGoogleLogin}>
          <SocialMediaButton
            sx={{
              backgroundColor: theme.palette.icons.google,
              '&:hover': {
                backgroundColor: '#dd2c00'
              }
            }}
            startIcon={<GoogleIcon sx={{ width: 25, height: 25 }} />}
            text='Google'
          />
        </Grid>
        {process.env.FACEBOOK_LOGIN_ENABLED === 'true' && (
          <Grid item onClick={handleFacebookLogin}>
            <SocialMediaButton
              sx={{
                backgroundColor: theme.palette.icons.facebook,
                '&:hover': {
                  backgroundColor: '#2f60b2'
                }
              }}
              startIcon={<FacebookIcon sx={{ width: 25, height: 25 }} />}
              text='Facebook'
            />
          </Grid>
        )}
      </Grid>
      <Grid item>
        <Typography component='div' display='block'>
          OR
        </Typography>
      </Grid>
    </Grid>
  )
}

export default SocialLoginButtons
