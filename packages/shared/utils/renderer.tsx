import React from 'react'
import { Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'
import createClient from '../graphql/client'
import theme from './theme'
import history from '../utils/history'

const renderer = (App: React.FunctionComponent) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={createClient()}>
        <Router history={history}>
          <App />
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default renderer
