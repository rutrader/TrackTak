import React, { useState } from 'react'

export const ModalContext = React.createContext({
  activeModal: {},
  setActiveModal: () => {}
})

export const ModalContextProvider = props => {
  const setActiveModal = activeModal => {
    setState({ ...state, activeModal: activeModal })
  }

  const initState = {
    activeModal: {},
    setActiveModal: setActiveModal
  }

  const [state, setState] = useState(initState)

  return (
    <ModalContext.Provider value={state}>
      {props.children}
    </ModalContext.Provider>
  )
}
