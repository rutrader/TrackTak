import React, { useState } from 'react'

export const FormContext = React.createContext({
  formValues: {},
  setFormValues: () => {}
})

export const FormContextProvider = props => {
  const setFormValues = formValues => {
    setState({ ...state, formValues: formValues })
  }

  const initState = {
    formValues: {},
    setFormValues: setFormValues
  }

  const [state, setState] = useState(initState)

  return (
    <FormContext.Provider value={state}>{props.children}</FormContext.Provider>
  )
}
