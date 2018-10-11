import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Mutation, Query } from 'react-apollo'
import Input from 'common/Forms/Input'
import ErrorMessage from 'common/Error/ErrorMessage'
import Dropdown from 'common/Forms/Dropdown'
import { UPDATE_COMPANY } from 'services/mutations'
import './CompanyRegisterForm.css'
import './RegistrationFormSecondStep.css'

import uploadLogo from 'assets/images/light-bulb.svg'
import { GET_EMPLOYER } from '../../../services/queries'

export class RegisterFormSecondStep extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      token: null,
      userId: null,
      errors: null,
      loading: false,
      input: {},
      dropdownValue: '',
      dropdownActive: false,
      data: [
        {
          title: 'Agriculture & Mining',
          items: [
            'Farming and Ranching',
            'Forestry & Loggin',
            'Fishing, Hunting',
            'Mining & Quarrying',
            'Agriculture & Mining'
          ]
        },
        {
          title: 'Computer & Electronics',
          items: [
            'Audio, Video & Photography',
            'Computers & Repair',
            'Electronics & Repair',
            'Electronics & Repair',
            'Electronics & Repair',
            'Electronics & Repair',
          ]
        }
      ]
    }
    this.formRef = React.createRef()
    this.dropdownRef = React.createRef()
  }

  componentDidMount = () => {
    window.addEventListener('click', this.handleOutsideDropdownClick)
    this.setState({
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId')
    })
  }

  componentWillUnmount = () => {
    window.removeEventListener('click', this.handleOutsideDropdownClick)
  }

  handleDropdownClick = () => {
    this.setState(prevState => ({
      dropdownActive: !prevState.dropdownActive
    }))
  }

  handleDropdownItemClick = value => {
    this.setState(prevState => ({
      dropdownValue: value,
      dropdownActive: false
    }))
  }

  handleOutsideDropdownClick = e => {
    if (this.state.dropdownActive && !this.dropdownRef.current.contains(e.target)) {
      this.setState({ dropdownActive: false })
    }
  }

  handleSubmit = () => {
    const elements = this.formRef.current.elements
    let data = {}
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].value !== '')
        data[elements[i].name] = elements[i].value
    }
    this.setState({
      input: {
        ...data,
        id: this.state.userId
      }
    })
  }

  render() {
    const {
      errors,
      input,
      dropdownValue,
      dropdownActive,
      data,
      loading,
      userId
    } = this.state
    const { history } = this.props
    const error = errors && errors[0] && errors[0].message
    return (
      <Query
        query={GET_EMPLOYER}
        variables={{ id: userId }}
      >
        {data => {
          return (
            <Mutation
              mutation={UPDATE_COMPANY}
              variables={{ input }}
              onError={errors => this.setState({ errors: errors.graphQLErrors })}
              onCompleted={() => history.push('/company/jobs/default')}
            >
              {updateCompany => (
                <form
                  ref={this.formRef}
                  className='form'
                  onSubmit={async e => {
                    e.preventDefault()
                    await this.setState({ loading: true })
                    await this.handleSubmit()
                    await updateCompany(input)
                    await this.setState({ loading: false })
                  }}>
                  <div className='panel company-panel-wide'>
                    <Input
                      id='companyUrl'
                      label='1. Company Website'
                      type='url'
                      placeholder='Enter website link'
                      name='website'
                    />
                    <div className="row form-row">
                      <Input
                        id='companyOffice'
                        label='2. Company Office'
                        type='text'
                        placeholder='Enter first line of address'
                        name='address'
                        desc='(If multiple offices, specify London)'
                      />
                      <Input
                        id='postcode'
                        label='3. Postcode'
                        type='text'
                        placeholder='Enter company postcode'
                        name='postcode'
                      />
                    </div>
                    <Dropdown
                      refProp={this.dropdownRef}
                      label='4. Company sector'
                      id='sector'
                      name='sectorId'
                      placeholder='Select from the list'
                      defaultValue={dropdownValue}
                      onInputClick={this.handleDropdownClick}
                      onItemClick={this.handleDropdownItemClick}
                      dropdownActive={dropdownActive}
                      data={data}
                    />
                    <Input
                      id='employees'
                      label='5. Number of employees'
                      type='text'
                      placeholder='Enter number'
                      name='employeesNumber'
                      desc='(Approximate count)'
                    />
                    <Input
                      id='contactNumber'
                      label='6. Contact number'
                      type='text'
                      placeholder='Enter number'
                      name='phoneNumber'
                    />
                    <Input
                      id='description'
                      label='7. Describe the company'
                      type='text'
                      placeholder='Tell us a bit more about the company'
                      name='description'
                      desc='(150 characters max)'
                      className='AboutCompany'
                    />
                    {error && <ErrorMessage message={error} />}
                  </div>
                  <div className="panel company-panel-wide-short">
                    <div className="companyLogo">
                      <div className="media">
                        <img className="mr-3" src={uploadLogo} alt='Upload Logo' />
                        <div className="media-body">
                          <h5 className="mt-0">Company Logo</h5>
                          Select jpg or png file
                  </div>
                      </div>
                    </div>
                    <div className="uploadLogo">
                      <button type="submit" className="btn">Upload Image</button>
                    </div>
                  </div>
                  <div className="login-button-container">
                    <button type="submit" className="button">
                      {loading ? 'Loading...' : 'Complete Profile'}
                    </button>
                  </div>
                </form>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default RegisterFormSecondStep