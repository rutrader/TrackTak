import React, { useState } from 'react'

export const TabsContext = React.createContext({
  activeTab: {
    identifier: undefined,
    index: undefined
  },
  setActiveTab: () => {}
})

export const TabsContextProvider = props => {
  const setActiveTab = activeTab => {
    setState({ ...state, activeTab: activeTab })
  }

  const initState = {
    activeTab: {},
    setActiveTab: setActiveTab
  }

  const [state, setState] = useState(initState)

  return (
    <TabsContext.Provider value={state}>{props.children}</TabsContext.Provider>
  )
}
