import React, { Component } from 'react'
import Input from 'common/Forms/Input'
import ErrorMessage from 'common/Error/ErrorMessage'
import { Query, Mutation } from 'react-apollo'
import uploadLogo from 'assets/images/light-bulb.svg'
import { GET_EMPLOYER } from 'services/queries'
import { UPDATE_COMPANY } from 'services/mutations'
import './CompanyInformation.css'

export class CompanyInformation extends Component {

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
    this.containerRef = React.createRef()
  }

  componentDidMount = () => {
    window.addEventListener('click', this.handleInputDeactivate)
  }

  componentWillUnmount = () => {
    window.removeEventListener('click', this.handleInputDeactivate)
  }

  componentDidMount = async () => {
    await this.setState({
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token'),
    })
  }

  handleInputDeactivate = (inputActive, e) => {
    if (inputActive && !this.containerRef.current.contains(e.target)) {
      this.inputRef.current.blur()
      this.setState({
        inputActive: false
      })
    }
  }

  handleSubmit = async () => {

    const elements = this.formRef.current.elements
    let data = {}
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].value !== '') {
        if (elements[i].name === 'logo') {
          const reader = new FileReader();
          reader.readAsDataURL(elements[i].files[0]);
          reader.onload = async () => {
            //console.log(reader.result);
            data['logo'] = await reader.result;
            // setTimeout(() => {
            //   console.log('data', data);
            //   data[elements[i].name] = reader.result;
            // }, 2000);
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
          };
        } else {
          data[elements[i].name] = elements[i].value
        }
      }

      console.log('elements', elements)
    }
    this.setState({
      input: {
        ...data,
        id: this.state.userId
      }
    })
  }

  render() {
    const { errors, loading, input } = this.state
    const error = errors && errors[0] && errors[0].message
    return (
      <Query
        query={GET_EMPLOYER}
        variables={{ id: localStorage.getItem('userId') }}
      >
        {data => {
          const employer = data &&
            data.data &&
            data.data.employer
          return (
            <Mutation
              mutation={UPDATE_COMPANY}
              variables={{ input }}
              onCompleted={() => this.setState({ loading: false })}
            >
              {updateCompany => {
                return (
                  <div>
                    <form
                      ref={this.formRef}
                      className="form"
                      onSubmit={async e => {
                        console.log('employer info', data)
                        e.preventDefault()
                        await this.setState({ loading: true })
                        await this.handleSubmit()
                        await updateCompany()
                      }}
                    >
                      <div className="panel company-panel-wide-short company-main-info">
                        <div className="container row">
                          <div className="col-sm-4">
                            <Input
                              id='companyName'
                              label='Company Name'
                              type='text'
                              placeholder='Enter company name'
                              name='companyName'
                              defaultValue={employer && employer.companyName}
                              propsRef={this.containerRef}
                            />
                          </div>
                          <div className="col-sm-4">
                            <Input
                              id='email'
                              label='Company email'
                              type='email'
                              placeholder='Enter company email'
                              name='email'
                              defaultValue={employer && employer.user && employer.user.email}
                              propsRef={this.containerRef}
                            />
                          </div>
                          <div className="col-sm-4">
                            {/* <Input
                            id='password'
                            label='Password'
                            type='password'
                            placeholder='Enter password'
                            name='password'
                            propsRef={this.containerRef}
                          /> */}
                            <a href="#">Change</a>
                          </div>
                        </div>
                      </div>
                      <div className='panel company-panel-wide company-content'>
                        <Input
                          id='companyUrl'
                          label='1. Company Website'
                          type='url'
                          placeholder='Enter website link'
                          name='website'
                          defaultValue={employer && employer.website}
                          propsRef={this.containerRef}
                        />
                        <div className="row form-row">
                          <Input
                            id='companyOffice'
                            label='2. Company Office'
                            type='text'
                            placeholder='Enter first line of address'
                            name='address'
                            desc='(If multiple offices, specify London)'
                            defaultValue={employer && employer.address}
                            propsRef={this.containerRef}
                          />
                          <Input
                            id='postcode'
                            label='3. Postcode'
                            type='text'
                            placeholder='Enter company postcode'
                            name='postcode'
                            defaultValue={employer && employer.postcode}
                            propsRef={this.containerRef}
                          />
                        </div>
                        {/* <Dropdown
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
                      /> */}
                        <Input
                          id='employees'
                          label='5. Number of employees'
                          type='text'
                          placeholder='Enter number'
                          name='employeesNumber'
                          desc='(Approximate count)'
                          defaultValue={employer && employer.employeesNumber}
                          propsRef={this.containerRef}
                        />
                        <Input
                          id='contactNumber'
                          label='6. Contact number'
                          type='text'
                          placeholder='Enter number'
                          name='phoneNumber'
                          defaultValue={employer && employer.phoneNumber}
                          propsRef={this.containerRef}
                        />
                        <Input
                          id='description'
                          label='7. Describe the company'
                          type='text'
                          placeholder='Tell us a bit more about the company'
                          name='description'
                          desc='(150 characters max)'
                          className='AboutCompany'
                          defaultValue={employer && employer.description}
                          propsRef={this.containerRef}
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
                          <Input
                            id='logo'
                            type='file'
                            name='logo'
                            className='AboutCompany'
                            defaultValue={employer && employer.logo}
                            propsRef={this.containerRef}
                          />
                        </div>
                      </div>
                      <div className="login-button-container">
                        <button type="submit" className="button">
                          {loading ? 'Loading...' : 'Complete Profile'}
                        </button>
                      </div>
                    </form>
                  </div>
                )
              }
              }
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default CompanyInformation