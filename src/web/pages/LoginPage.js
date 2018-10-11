import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GuestPage from 'web/pages/GuestPage'
import LoginForm from '../components/LoginForm'
import './LoginPage.css'

export class LoginPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render () {
    const { history } = this.props
    return (
      <GuestPage
        heading={{
          title: 'Log in into your account',
          desc: 'Log in to see your applications and jobs',
          color: 'white',
        }}
      >
        <LoginForm history={history} />
      </GuestPage>
    )
  }
}

export default LoginPage
