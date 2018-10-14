import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import DefaultHeader from '../../../../common/DefaultHeader'
import { ACTIVATE_USER } from 'services/mutations'


class CallActivate extends Component {
  static propTypes = {
    activate: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired
  }

  componentDidMount = async () => {
    const { activate, hash } = this.props
    await activate(hash)
  }

  render() {
    return this.props.children
  }
}

export class RegisterFormEmail extends Component {
  state = {
    errors: null
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, history } = this.props
    const params = match.params
    return (
      <Mutation
        mutation={ACTIVATE_USER}
        variables={{ input: { hash: params.hash } }}
        onCompleted={() => history.push('/talent/login')}
        onError={errors => this.setState({ errors })}
      >
        {activate => (
          <CallActivate
            activate={activate}
            input={{ hash: params.hash }}
            history={history}
          >
            <div className='email-page'>
              <div className='container'>
                <DefaultHeader />
              </div>
              <div className="emailBody">
                <h3>Congrats! An email is on it’s way to you</h3>
                <p>It contains your new profile</p>
              </div>
            </div>
          </CallActivate>
        )}
      </Mutation>
    )
  }
}

export default RegisterFormEmail