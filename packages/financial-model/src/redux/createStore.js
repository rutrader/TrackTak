import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

const createStore = (preloadedState, reducers) => {
  return configureStore({
    reducer: combineReducers(reducers),
    preloadedState
  })
}

export default createStore
