import React from 'react'
const HandlersContext = React.createContext({})

const { Provider: HandlersProvider } = HandlersContext

export {
  HandlersContext,
  HandlersProvider
}