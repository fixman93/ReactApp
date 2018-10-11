import React, {Component} from 'react'
import {Mutation} from 'react-apollo'
import PropTypes from 'prop-types'
import Input from 'common/Forms/Input'
import ErrorMessage from 'common/Error/ErrorMessage'
import RegisterHand from '../../../assets/images/CompanyRegistration/hands-holding@3x.png'
import { ADD_COMPANY } from 'services/mutations'
import './CompanyRegisterForm.css'
import './RegisterFormFirstStep.css'

export class RegisterFormFirstStep extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  constructor (props) {
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

  render () {
    const {history} = this.props
    const {input, errors} = this.state
    const error = errors && errors[0] && errors[0].message
    return (
      <Mutation
        mutation={ADD_COMPANY}
        variables={{ input }}
        onError={errors => this.setState({ errors: errors.graphQLErrors })}
        onCompleted={() => history.push('/company/email')}
      >
        {addCompanyMutation => (
          <form
            ref={this.formRef}
            className="form firstStep"
            onSubmit={async e => {
              e.preventDefault()
              await this.handleSubmit()
              await addCompanyMutation(input)
            }}
          >
            <div className='panel'>
              <Input 
                id="companyName"
                label="1. Company name"
                type="text"
                placeholder="Enter company name"
                name="companyName"
              />
              <Input
                id='companyEmail'
                label='2. Company email'
                type='email'
                placeholder='Enter company email'
                name='email'
              />
              <Input
                id='password'
                label='3. Password'
                type='password'
                placeholder='Enter password'
                name='password'
              />
              {error && <ErrorMessage message={error} />}
            </div>
            <div className='login-button-container'>         
              <button
                type='submit'
                className='button'
              >
                Create Profile
              </button>
            </div>
            <img src={RegisterHand} alt="Company Hand" className="RegisterHand" />
          </form>
        )}
      </Mutation>
    )
  }
}

export default RegisterFormFirstStep