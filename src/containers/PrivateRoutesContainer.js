import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoutesContainer extends Component {
  render () {
    const { token } = this.props
    return token ? 
      this.props.children : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: this.props.location }
          }}
        />
    )
  }
}

export default PrivateRoutesContainer