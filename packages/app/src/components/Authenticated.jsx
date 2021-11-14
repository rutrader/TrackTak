import React, { useCallback, useEffect } from 'react'
import {
  PageSpinner,
  snackbarActions,
  getUrlAuthParameters,
  useAuth
} from '@tracktak/common'
import { useDispatch } from 'react-redux'

const Authenticated = ({ children }) => {
  const { isAuthenticated, hasLoadedAuthDetails, sendChallengeAnswer } =
    useAuth()

  const dispatch = useDispatch()

  const handleVerificationFailure = useCallback(() => {
    dispatch(
      snackbarActions.setMessage({
        message: 'Failed to update your details',
        severity: 'error'
      })
    )
  }, [dispatch])

  const handleVerificationSuccess = useCallback(() => {
    dispatch(
      snackbarActions.setMessage({
        message: 'Successfully updated your details',
        severity: 'success'
      })
    )
  }, [dispatch])

  useEffect(() => {
    if (!isAuthenticated && hasLoadedAuthDetails) {
      window.location.href = process.env.GATSBY_DOMAIN_URL
    }
  }, [hasLoadedAuthDetails, isAuthenticated])

  useEffect(() => {
    const authParameters = getUrlAuthParameters()
    if (authParameters.challengeCode) {
      sendChallengeAnswer(
        authParameters.challengeCode,
        handleVerificationSuccess,
        handleVerificationFailure,
        handleVerificationFailure
      )
    }
  }, [
    handleVerificationFailure,
    handleVerificationSuccess,
    sendChallengeAnswer
  ])

  if (!hasLoadedAuthDetails) {
    return <PageSpinner />
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

export default Authenticated
