import React from 'react'
const PropertiesContext = React.createContext({})

const { Provider: PropertiesProvider } = PropertiesContext

export {
  PropertiesContext,
  PropertiesProvider
}