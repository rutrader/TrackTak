import { PageSpinner, useAuth } from '@tracktak/common'
import React, { useEffect } from 'react'
import subdomainUrl from '../shared/subdomainUrl'

const withAuthenticatedRedirect = Component => {
  const Container = props => {
    const { isAuthenticated, hasLoadedAuthDetails } = useAuth()

    useEffect(() => {
      if (isAuthenticated && hasLoadedAuthDetails) {
        window.location.href = subdomainUrl
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
