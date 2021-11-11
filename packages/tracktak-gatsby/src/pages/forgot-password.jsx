import React from 'react'
import { Helmet } from 'react-helmet'
import { utils, withAuthenticatedRedirect } from '@tracktak/common'
import { Grid } from '@mui/material'
import Authentication, {
  AUTHENTICATION_FORM_STATE
} from '../components/Authentication'
import { navigate } from 'gatsby'

const ForgotPassword = ({ location }) => {
  const handleSuccess = () => {
    navigate('/dashboard')
  }

  return (
    <>
      <Helmet>
        <title>{utils.getTitle('Forgot Password')}</title>
        <link rel='canonical' href={`${utils.resourceName}/forgot-password`} />
        <meta name='description' content='Tracktak password recovery.' />
      </Helmet>
      <Grid container justifyContent='center'>
        <Grid item>
          <Authentication
            initialState={AUTHENTICATION_FORM_STATE.FORGOTTEN_PASSWORD}
            onSuccess={handleSuccess}
            location={location}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default withAuthenticatedRedirect(ForgotPassword)
