import {
  getUrlAuthParameters,
  useAuth
} from '../../../common/src/hooks/useAuth'
import React, { useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PageSpinner from '../../../common/src/components/PageSpinner'
import { setMessage } from '../../../common/src/redux/actions/snackbarActions'
import { useDispatch } from 'react-redux'
import mainUrl from '../shared/mainUrl'

const withAuthentication = Component => {
  const Container = props => {
    const { isAuthenticated, hasLoadedAuthDetails, sendChallengeAnswer } =
      useAuth()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleVerificationFailure = useCallback(() => {
      dispatch(
        setMessage({
          message: 'Failed to update your details',
          severity: 'error'
        })
      )
    }, [dispatch])

    const handleVerificationSuccess = useCallback(() => {
      dispatch(
        setMessage({
          message: 'Successfully updated your details',
          severity: 'success'
        })
      )
    }, [dispatch])

    useEffect(() => {
      if (!isAuthenticated && hasLoadedAuthDetails) {
        window.location.href = mainUrl
      }
    }, [hasLoadedAuthDetails, isAuthenticated, navigate, location.search])

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

    return isAuthenticated && <Component {...props} />
  }

  return Container
}

export default withAuthentication
