import { createReducer } from '@reduxjs/toolkit'
import { clearMessage, setMessage } from '../actions/snackbarActions'

const initialState = {
  message: null,
  severity: null
}

export const snackbarReducer = createReducer(initialState, builder => {
  builder.addCase(setMessage, (state, action) => {
    const { message, severity = 'info' } = action.payload

    state.severity = severity
    state.message = message
  })
  builder.addCase(clearMessage, state => {
    state.message = null
    state.severity = null
  })
})
