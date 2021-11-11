import React from 'react'
import { Helmet } from 'react-helmet'
import getTitle from '../shared/getTitle'
import resourceName from '../shared/resourceName'
import { Grid } from '@material-ui/core'
import Authentication, {
  AUTHENTICATION_FORM_STATE
} from '../components/Authentication'
import { navigate } from 'gatsby'
import withAuthenticatedRedirect from '../hocs/withAuthenticatedRedirect'

const ForgotPassword = ({ location }) => {
  const handleSuccess = () => {
    navigate('/dashboard')
  }

  return (
    <>
      <Helmet>
        <title>{getTitle('Forgot Password')}</title>
        <link rel='canonical' href={`${resourceName}/forgot-password`} />
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
