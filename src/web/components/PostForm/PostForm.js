import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'
import { Query, Mutation } from 'react-apollo'
import UIContainer from 'common/UIContainer'
import FeaturedTitle from 'common/FeaturedTitle'
import Dropdown from 'common/Forms/Dropdown'
import Radio from 'common/Forms/Radio'
import Input from 'common/Forms/Input'
import { ALL_ROLES } from 'services/queries'
import { ADD_JOB } from 'services/mutations'
import './PostForm.css'
import ErrorMessage from '../../../common/Error/ErrorMessage';

export class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    heading: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      dropdownActive: false,
      dropdownValue: '',
      input: {},
      userId: null,
      errors: {}
    }
    this.formRef = React.createRef()
    this.dropdownRef = React.createRef()
  }

  componentDidMount = () => {
    window.addEventListener('click', this.handleOutsideDropdownClick)
    this.setState({
      userId: localStorage.getItem('userId')
    })

    /*if (Object.keys(this.props.input).length > 0) {
      const elements = this.formRef.current.elements;
      const IDs = ['startIn', 'remuneration', 'interviewStages', 'contractLength', 'role', 'experience']
      IDs.map(id => {
        if (elements[id]) {
          if (Array.from(elements[id]).length > 1) {
            let radio = Array.from(elements[id]).find(el => el.value == this.props.input.jobofferSet[id])
             let r = ReactDOM.findDOMNode(radio);
             r.checked = true;
          } else {
            if (id === 'role') {
              this.setState({
                dropdownValue: this.props.input.jobofferSet[id]
              })
            }
            let r = ReactDOM.findDOMNode(elements[id]);
             r.value = this.props.input.jobofferSet[id]
          }
        }
      })
    }*/
  }

  componentWillUnmount = () => {
    window.removeEventListener('click', this.handleOutsideDropdownClick)
  }

  handleDropdownClick = () => {
    this.setState(prevState => ({
      dropdownActive: !prevState.dropdownActive
    }))
  }

  handleDropdownItemClick = (value, id) => {
    this.setState({
      dropdownValue: value,
      dropdownActive: false,
      roleId: id
    })
  }

  handleOutsideDropdownClick = e => {
    if (this.state.dropdownActive && !this.dropdownRef.current.contains(e.target)) {
      this.setState({ dropdownActive: false })
    }
  }

  setInputProperty = (element) => {
    this.setState(prevState => ({
      input: Object.assign({},
        prevState.input,
        { [element.name]: element.value })
    }))
  }

  setError = (whichError, error) => {
    this.setState(prevState => ({
      errors: Object.assign({}, prevState.errors, { [whichError]: error })
    }))
  }


  handleSubmit = async () => {
    let names = ['contractLength', 'experience', 'roleId', 'remuneration', 'interviewStages', 'startIn']
    const list = Array.from(this.formRef.current.elements);

    // clear the errors
    await this.setState({
      errors: {}
    })

    await console.log(list.filter(el => el.name == 'contractLength'))

    // map through dom elements
    await list.map(element => {

      // if radio input, check if is checked and add to input object
      if (element.type === 'radio') {
        if (element.checked) {
          this.setInputProperty(element);
        }
      } else {
        // if is not radio input check if it has value
        if (element.name === 'remuneration') {
          if (/^\d+$/.test(element.value)) {
            this.setInputProperty(element);
          } else {
            this.setError("number", "Please type a number without spaces")
          }
        }
        else if (element.value !== '') {
          // if it's roleiD add role title to input object

          this.setState(prevState => ({
            input: Object.assign({}, prevState.input, { [element.name]: element.value })

          }))

          // check element name and if number add else add error


        } else {
          //else add error
          if (element.name !== '') {
            this.setError("global", "Please fill the form")
          }


        }
      }

    })

    if (Object.keys(this.state.errors).length === 0) {
      this.props.onSubmit(Object.assign({},
        this.state.input, { roleId: this.state.roleId }));
    }
  }



  render() {
    const { dropdownActive, dropdownValue, input, userId, roleId, errors } = this.state
    const { heading, onBack } = this.props
    return (
      <Query
        query={ALL_ROLES}
      >
        {data => {
          const roles = data &&
            data.data && data.data.allRoles &&
            data.data.allRoles.edges
          return (
            <Mutation
              mutation={ADD_JOB}
              variables={{
                userId,
                roleId,
                employerId: userId,
                contractLength: input.contractLength,
                experience: input.experience,
                remuneration: input.remuneration,
                interviewStages: input.interviewStages,
                startIn: input.startIn,
              }}
            >
              {addPost => (
                <React.Fragment>
                  <FeaturedTitle
                    title={heading.title}
                    desc={heading.desc}
                    color={heading.color}
                  />
                  <form
                    ref={this.formRef}
                    className='form'
                    onSubmit={async e => {
                      e.preventDefault()
                      await this.handleSubmit()

                    }}
                  >
                    <UIContainer className='post-form'>
                      {errors['global'] && <ErrorMessage message={errors['global']} />}
                      <Dropdown
                        label={`1. What's the role`}
                        id='role'
                        type='text'
                        placeholder='Select from the list'
                        name='role'
                        onItemClick={this.handleDropdownItemClick}
                        onInputClick={this.handleDropdownClick}
                        dropdownActive={dropdownActive}
                        defaultValue={dropdownValue}
                        data={roles}
                        dataToMap='name'
                        refProp={this.dropdownRef}
                        errors={errors.roleId}
                      />

                      <Radio
                        label='2. Type of employment?'
                        desc='(Select one)'
                        id='employment'
                        name='contractLength'
                        options={[
                          { id: 'permanent', label: 'Permanent (Full Time)', value: '1', name: 'contractLength' },
                          { id: 'contract', label: 'Contract (Fixed Term)', value: '0', name: 'contractLength' }
                        ]}
                        errors={errors.contractLength}
                      />

                      <Radio
                        label='3. Minimum years of experience?'
                        desc='(Select one)'
                        id='experience'
                        name='experience'
                        options={[
                          { id: 'sixMonths', label: '6 months', value: 0.5, name: 'experience' },
                          { id: 'oneYear', label: '1 year', value: 1, name: 'experience' },
                          { id: 'twoYears', label: '2 years', value: 2, name: 'experience' },
                          { id: 'threeYears', label: '3 years', value: 3, name: 'experience' },
                          { id: 'fourYears', label: '4 years', value: 4, name: 'experience' },
                          { id: 'fiveYears', label: '5+ years', value: 5, name: 'experience' }
                        ]}
                        errors={errors.experience}
                      />

                      <Input
                        label='Maximum budget for the role'
                        desc='(e.g. &pound;50000 or &pound;400 per day)'
                        name='remuneration'
                        placeholder='Enter number'
                        type='text'
                        id='budget'
                        errors={errors.remuneration}
                      />
                      {errors['number'] && <ErrorMessage message={errors['number']} />}
                      <Radio
                        label='5. How many interview stages will there be for this role?'
                        desc='(Select one)'
                        id='stages'
                        name='interviewStages'
                        options={[
                          { id: 'one', value: '1', label: '1', name: 'interviewStages' },
                          { id: 'two', value: '2', label: '2', name: 'interviewStages' },
                          { id: 'three', value: '3', label: '3', name: 'interviewStages' },
                          { id: 'four', value: '4', label: '4', name: 'interviewStages' },
                          { id: 'five', value: '5', label: '5', name: 'interviewStages' }
                        ]}
                        errors={errors.interviewStages}
                      />

                      <Radio
                        label='6. Expected new start date?'
                        desc='(Select one)'
                        id='startIn'
                        name='startIn'
                        options={[
                          { id: 'immediately', label: 'immediately', value: '0', name: 'startIn' },
                          { id: 'oneWeek', label: '1 week', value: '1', name: 'startIn' },
                          { id: 'twoWeeks', label: '2 weeks', value: '2', name: 'startIn' },
                          { id: 'oneMonth', label: '1 month', value: '4', name: 'startIn' },
                          { id: 'twoMonths', label: '2 months', value: '8', name: 'startIn' },
                          { id: 'threeMonths', label: '3+ months', value: '12', name: 'startIn' }
                        ]}
                        errors={errors.startIn}
                      />

                    </UIContainer>
                    <div className="button-container">
                      <button
                        type="button"
                        className="btn btn-white-orange no-background"
                        onClick={() => onBack()}
                      >
                        Back
                      </button>
                      <button type="submit" className="btn btn-white-orange">Next</button>
                    </div>
                  </form>
                </React.Fragment>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default PostForm