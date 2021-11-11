import React from 'react'
import { Helmet } from 'react-helmet'
import { utils, withAuthenticatedRedirect } from '@tracktak/common'
import { Grid } from '@mui/material'
import Authentication from '../components/Authentication'
import { navigate } from 'gatsby'

const SignIn = ({ location }) => {
  const handleSuccess = () => {
    navigate('/dashboard')
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
