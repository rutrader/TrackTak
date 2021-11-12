import {
  getUrlAuthParameters,
  useAuth
} from '../../../common/src/hooks/useAuth'
import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageSpinner from '../../../common/src/components/PageSpinner'
import { setMessage } from '../../../common/src/redux/actions/snackbarActions'
import { useDispatch } from 'react-redux'

const withAuthentication = Component => {
  const Container = props => {
    const { isAuthenticated, hasLoadedAuthDetails, sendChallengeAnswer } =
      useAuth()

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        navigate('/sign-in')
      }
    }, [hasLoadedAuthDetails, isAuthenticated, navigate, props.location.search])

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
