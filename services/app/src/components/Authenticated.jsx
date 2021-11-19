import React, { useEffect } from 'react'
import { PageSpinner, useAuth } from '@tracktak/common'

const Authenticated = ({ children }) => {
  const { isAuthenticated, hasLoadedAuthDetails } = useAuth()

  useEffect(() => {
    if (!isAuthenticated && hasLoadedAuthDetails) {
      window.location.href = `${process.env.DOMAIN_URL}${window.location.search}`
    }
  }, [hasLoadedAuthDetails, isAuthenticated])

  if (!hasLoadedAuthDetails) {
    return <PageSpinner />
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

export default Authenticated
