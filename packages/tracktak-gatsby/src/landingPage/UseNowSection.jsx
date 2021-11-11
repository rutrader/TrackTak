import { Box, Typography, Link, Paper, Divider } from '@material-ui/core'
import { Link as RouterLink } from 'gatsby'
import React from 'react'
import RoundButton from '../components/RoundButton'
import { useTheme } from '@material-ui/core/styles'
import SocialLoginButtons from '../components/SocialLoginButtons'

const HeaderText = props => (
  <Typography
    {...props}
    sx={{
      whiteSpace: 'nowrap',
      fontSize: theme => theme.typography.fontSize3,
      color: theme => theme.palette.primary.mainTextColor,
      fontWeight: 'bold',
      marginBottom: theme => theme.spacing(2)
    }}
  />
)

const UseNowSection = () => {
  const theme = useTheme()
  return (
    <Paper
      elevation={6}
      sx={{
        boxShadow: '0 1px 10px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)',
        borderRadius: '10px',
        padding: `${theme.spacing(4)}  ${theme.spacing(4)} `,
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        display: 'flex'
      }}
    >
      <Box sx={{ maxWidth: '500px' }}>
        <HeaderText variant='h3' gutterBottom>
          Get Started Now
        </HeaderText>
        <Typography
          color='textSecondary'
          gutterBottom
          sx={{ fontSize: theme.typography.fontSize2 }}
        >
          Sign up with your social media account or email address.
        </Typography>
        <SocialLoginButtons />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2.5
          }}
        >
          <RoundButton
            variant='contained'
            component={RouterLink}
            to='/sign-up'
            sx={{
              mb: 2.5,
              width: '70%',
              p: theme.spacing(1.5),
              fontSize: 20
            }}
          >
            Create account
          </RoundButton>
          <RoundButton
            component={RouterLink}
            to='/sign-in'
            sx={{
              mb: 2.5,
              width: '70%',
              p: theme.spacing(1.5),
              textTransform: 'none',
              color: theme.palette.primary.mainTextColor,
              textDecoration: 'underline',
              fontSize: 20
            }}
          >
            Already have an account? Log in
          </RoundButton>
        </Box>
        <Divider sx={{ mb: 2 }} variant='middle' />
        <Typography color='textSecondary' variant='h7' gutterBottom>
          By proceeding to create your account and use tracktak, you are
          agreeing to our{' '}
          <Link
            href='/terms-and-conditions'
            sx={{ color: theme.palette.primary.purple }}
          >
            <b>terms and conditions</b>
          </Link>{' '}
          and{' '}
          <Link
            href='/privacy-policy'
            sx={{ color: theme.palette.primary.purple }}
          >
            <b>privacy policy</b>
          </Link>
          .
        </Typography>
      </Box>
    </Paper>
  )
}

export default UseNowSection
