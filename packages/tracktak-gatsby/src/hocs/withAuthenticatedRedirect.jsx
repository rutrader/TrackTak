import { PageSpinner, useAuth } from '@tracktak/common'
import React, { useEffect } from 'react'

const withAuthenticatedRedirect = Component => {
  const Container = props => {
    const { isAuthenticated, hasLoadedAuthDetails } = useAuth()

    useEffect(() => {
      if (isAuthenticated && hasLoadedAuthDetails) {
        window.location.href = process.env.GATSBY_APP_SUBDOMAIN_URL
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
