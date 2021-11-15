import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { navigate } from 'gatsby'
import { snackbarActions, utils, axios, useAuth } from '@tracktak/common'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { Box } from '@mui/material'
import queryString from 'query-string'
import jsonAdapter from 'axios-jsonp'

export const AUTHENTICATION_FORM_STATE = {
  SIGN_UP: 'SIGN_UP',
  SIGN_IN: 'SIGN_IN',
  FORGOTTEN_PASSWORD: 'FORGOTTEN_PASSWORD'
}

const Authentication = ({
  initialState = AUTHENTICATION_FORM_STATE.SIGN_IN,
  onSuccess = utils.noop,
  onFailure = utils.noop,
  isModal = false,
  location
}) => {
  const dispatch = useDispatch()
  const [formState, setFormState] = useState(initialState)
  const { signUp, signIn } = useAuth()

  const onError = error => {
    dispatch(
      snackbarActions.setMessage({
        message: error?.message,
        severity: 'error'
      })
    )

    onFailure()
  }

  const handleSwitchToSignInClick = () => {
    if (isModal) {
      setFormState(AUTHENTICATION_FORM_STATE.SIGN_IN)
      return
    }

    navigate('/sign-in/')
  }

  const handleSwitchToSignUpClick = () => {
    if (isModal) {
      setFormState(AUTHENTICATION_FORM_STATE.SIGN_UP)
      return
    }

    navigate('/sign-up/')
  }

  const handleSwitchToForgotPasswordClick = () => {
    if (isModal) {
      setFormState(AUTHENTICATION_FORM_STATE.FORGOTTEN_PASSWORD)
      return
    }

    navigate('/forgot-password/')
  }

  const onSignUpSuccess = (_, email, password) => {
    signIn(email, password, onSuccess, onError)
  }

  const handleSignUpSubmit = async (event, payload) => {
    event.preventDefault()

    if (payload.checkedMailingList) {
      const serializedData = queryString.stringify({
        id: '81167d9c5b',
        LOCATION: 'Sign up',
        MERGE0: payload.email
      })

      const {
        data: { result, msg: message }
      } = await axios({
        url: `https://tracktak.us18.list-manage.com/subscribe/post-json?u=77ebb5b550a15c12b38bd913e&${serializedData}`,
        adapter: jsonAdapter,
        callbackParamName: 'c'
      })

      if (result !== 'success') {
        console.error(message)
      }
    }

    signUp(
      payload.email,
      payload.password,
      [{ Name: 'name', Value: payload.name }],
      onSignUpSuccess,
      onError
    )
  }

  const handleSignInSubmit = (event, payload) => {
    event.preventDefault()
    signIn(payload.email, payload.password, onSuccess, onError)
  }

  const handleForgotPasswordCancelClick = () => {
    if (isModal) {
      setFormState(AUTHENTICATION_FORM_STATE.SIGN_IN)
      return
    }

    if (location.state?.referrer) {
      navigate(-1)
      return
    }
    navigate('/')
  }

  return (
    <Box
      sx={{
        maxWidth: '400px'
      }}
    >
      {formState === AUTHENTICATION_FORM_STATE.SIGN_UP && (
        <SignUpForm
          onSubmit={handleSignUpSubmit}
          onSwitchToSignInClick={handleSwitchToSignInClick}
        />
      )}
      {formState === AUTHENTICATION_FORM_STATE.SIGN_IN && (
        <SignInForm
          onSubmit={handleSignInSubmit}
          onSwitchToSignUpClick={handleSwitchToSignUpClick}
          onSwitchToForgotPasswordClick={handleSwitchToForgotPasswordClick}
        />
      )}
      {formState === AUTHENTICATION_FORM_STATE.FORGOTTEN_PASSWORD && (
        <ForgotPasswordForm onCancelClick={handleForgotPasswordCancelClick} />
      )}
    </Box>
  )
}

export default Authentication
