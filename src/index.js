import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import Cookies from 'js-cookie'
import { ApolloProvider } from 'react-apollo'
import 'assets/styles/main.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  uri: 'https://onebigappback.herokuapp.com/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: async operation => {
    let headers = { 'x-csrftoken': Cookies.get('csrftoken') }
    const token = localStorage.getItem('token')
    if (token) {
      headers['authorization'] =`JWT ${token}`
    }
    operation.setContext({ headers })
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
