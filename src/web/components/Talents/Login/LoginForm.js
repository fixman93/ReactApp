import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import ErrorMessage from 'common/Error/ErrorMessage'
import Input from 'common/Forms/Input'
import { LOGIN_USER } from 'services/mutations'

export class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: {},
      errors: null
    }
    this.formRef = React.createRef()
  }

  handleSubmit = () => {
    const elements = this.formRef.current.elements
    let data = {}
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].value !== '')
        data[elements[i].name] = elements[i].value
    }
    this.setState({
      input: data
    })
  }

  render() {
    const { history } = this.props
    const { input, errors } = this.state
    const error = errors && errors[0] && errors[0].message
    return (
      <Mutation
        mutation={LOGIN_USER}
        variables={{
          username: input.username,
          password: input.password
        }}
        onError={errors => this.setState({ errors: errors.graphQLErrors })}
        onCompleted={async data => {
          console.log(data)
          await localStorage.setItem('token', data.tokenAuth.token)
          await localStorage.setItem('userId', data.tokenAuth.id)
          await history.push('/talent/profile')
        }}
      >
        {loginUser => (
          <form
            ref={this.formRef}
            className="form loginForm"
            onSubmit={async e => {
              e.preventDefault()
              await this.handleSubmit()
              await loginUser(input.username, input.password)
            }}
          >
            <div className='panel'>
              <Input
                id="email"
                label="Email address"
                name="username"
                type="email"
                placeholder="Enter email address"
              />
              <Input
                id="password"
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
              />
              {error && <ErrorMessage message={error} />}
            </div>
            <div className="login-button-container">
              <Link to="/">Forgot password?</Link>
              <button type="submit" className="button">Log In</button>
            </div>
          </form>
        )}
      </Mutation>
    )
  }
}

export default LoginForm