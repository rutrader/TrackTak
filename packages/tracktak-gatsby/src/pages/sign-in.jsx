import React from 'react'
import { Helmet } from 'react-helmet'
import { utils } from '@tracktak/common'
import { Grid } from '@mui/material'
import Authentication from '../components/Authentication'
import withAuthenticatedRedirect from '../hocs/withAuthenticatedRedirect'

const SignIn = ({ location }) => {
  const handleSuccess = () => {
    window.location.href = process.env.GATSBY_APP_SUBDOMAIN_URL
  }

  return (
    <>
      <Helmet>
        <title>{utils.getTitle('Sign in')}</title>
        <link rel='canonical' href={`${utils.resourceName}/sign-in`} />
        <meta name='description' content='Sign in to Tracktak.' />
      </Helmet>
      <Grid container justifyContent='center'>
        <Grid item>
          <Authentication onSuccess={handleSuccess} location={location} />
        </Grid>
      </Grid>
    </>
  )
}

export default withAuthenticatedRedirect(SignIn)
