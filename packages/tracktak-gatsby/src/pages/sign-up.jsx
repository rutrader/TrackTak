import React from 'react'
import { Helmet } from 'react-helmet'
import { utils } from '@tracktak/common'
import { Grid } from '@mui/material'
import Authentication, {
  AUTHENTICATION_FORM_STATE
} from '../components/Authentication'
import { withAuthenticatedRedirect } from '@tracktak/auth'

const SignUp = ({ location }) => {
  return (
    <>
      <Helmet>
        <title>{utils.getTitle('Sign up')}</title>
        <link rel='canonical' href={`${utils.resourceName}/sign-up`} />
        <meta name='description' content='Sign up to Tracktak.' />
      </Helmet>
      <Grid container justifyContent='center'>
        <Grid item>
          <Authentication
            initialState={AUTHENTICATION_FORM_STATE.SIGN_UP}
            location={location}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default withAuthenticatedRedirect(SignUp)
