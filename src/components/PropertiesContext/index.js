import React from 'react'

const PropertiesContext = React.createContext({})

const {
  Provider: PropertiesProvider,
  Consumer: PropertiesConsumer
} = PropertiesContext

export {
  PropertiesContext,
  PropertiesProvider,
  PropertiesConsumer
}