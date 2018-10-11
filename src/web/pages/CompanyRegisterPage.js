import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { FirstStep, SecondStep } from '../components/CompanyRegisterForm'
import GuestPage from './GuestPage'
import './LoginPage.css'

export class CompanyRegisterPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render () {
    return (
      <GuestPage
        heading={{
          title: 'Looking to hire?',
          desc: 'Register now and discover the best way to hire',
          color: 'white'
        }}
      >
        {this.props.match.path === '/company/register' 
          ? (
            <FirstStep
              history={this.props.history}
              onSubmit={this.handleSubmitFirstStep} 
            />
          ) : (
            <SecondStep
              history={this.props.history}
              onSubmit={this.handleSubmitSecondStep}
            />
          )
        }
      </GuestPage>
    )
  }
}

export default CompanyRegisterPage
