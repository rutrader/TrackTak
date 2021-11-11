import { useAuth } from '@tracktak/auth'
import { PageSpinner } from '@tracktak/common'
import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

const withAuthenticatedRedirect = Component => {
  const Container = props => {
    const { isAuthenticated, hasLoadedAuthDetails } = useAuth()

    useEffect(() => {
      if (isAuthenticated && hasLoadedAuthDetails) {
        navigate('/dashboard')
      }
    }, [hasLoadedAuthDetails, isAuthenticated])

    if (!hasLoadedAuthDetails) {
      return <PageSpinner />
    }

    return !isAuthenticated && <Component {...props} />
  }

  return Container
}

export default withAuthenticatedRedirect
