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
import { setInput, setError } from '../../../common/Forms/helpers';

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
      errors: {},
      roleId: ""
    }
    this.formRef = React.createRef()
    this.dropdownRef = React.createRef()
  }

  componentDidMount = () => {
    window.addEventListener('click', this.handleOutsideDropdownClick)
    this.setState({
      userId: localStorage.getItem('userId')
    })
    if (this.props.propsData.jobofferSet) {
      this.setState({
        dropdownValue: this.props.propsData.jobofferSet.role,
        roleId: this.props.propsData.jobofferSet.roleId
      })
    }

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
      roleId: id,
    })
  }

  handleOutsideDropdownClick = e => {
    if (this.state.dropdownActive && !this.dropdownRef.current.contains(e.target)) {
      this.setState({ dropdownActive: false })
    }
  }



  handleSubmit = async () => {
    let names = ['contractLength', 'experience', 'roleId', 'remuneration', 'interviewStages', 'startIn']
    const list = Array.from(this.formRef.current.elements);

    // clear the errors
    await this.setState({
      errors: {}
    })

    // loop through element names
    await names.map(name => {
      if (name !== 'remuneration' && name !== 'roleId') {
        // if it's radio input - remuneration and roleId are not radio inputs

        // checks if at least one of radio inputs are checked with the same name
        let isAtLeastOneChecked = list.filter(el => el.name === name && el.checked === true).length === 1 ? true : false;

        // finds checked radio input
        let toAdd = list.find(el => el.name == name && el.checked);

        if (isAtLeastOneChecked) {
          // if one is checked, add it to input object
          setInput(this, name, toAdd.value)

        } else {
          // else add error to select one option
          setError(this, name, 'Please select one option')

        }

      } else {
        // if roleId, it's dropdown
        if (name === 'roleId') {
          let hasDropdownValue = this.state.dropdownValue !== "" ? true : false
          // check if dropdownValue isn't blank, if it's selected
          if (hasDropdownValue) {
            // if has value, add to input object
            this.setState(prevState => ({
              input: Object.assign({}, prevState.input,
                { "role": this.state.dropdownValue, "roleId": this.state.roleId })
            }))

          } else {
            // else add error to add roleId
            setError(this, name, 'Please add role')

          }
        } else {
          // else, it's remuneration name, check if it has value, and find the element
          let ifHasValue = list.find(el => el.name == name && el.value !== '') ? true : false;
          let toAdd = list.find(el => el.name == name);

          if (ifHasValue) {
            // if it has value and if it's number
            if (/^[0-9\s]*$/.test(toAdd.value)) {

              // add it to input object
              setInput(this, name, toAdd.value)
            } else {
              // else add error to errors object
              setError(this, name, 'Only numbers allowed')
            }

          } else {
            // it doesn't have value, add this error
            setError(this, name, 'Please add budget')

          }
        }
      }
    });

    // checks if errors object is empty, then call onSubmit function with input and roleId
    if (Object.keys(this.state.errors).length === 0) {
      this.props.onSubmit(Object.assign({},
        this.state.input, { roleId: this.state.roleId }));
    }
  }



  render() {
    const { dropdownActive, dropdownValue, input, userId, roleId, errors } = this.state
    const { heading, onBack, propsData } = this.props
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
                      {errors.roleId && <ErrorMessage message={errors.roleId} />}
                      <Radio
                        label='2. Type of employment?'
                        desc='(Select one)'
                        id='employment'
                        name='contractLength'
                        val={propsData.jobofferSet ? propsData.jobofferSet.contractLength : null}
                        options={[
                          { id: 'permanent', label: 'Permanent (Full Time)', value: '1', name: 'contractLength' },
                          { id: 'contract', label: 'Contract (Fixed Term)', value: '0', name: 'contractLength' }
                        ]}
                        errors={errors.contractLength}
                      />
                      {errors.contractLength && <ErrorMessage message={errors.contractLength} />}
                      <Radio
                        label='3. Minimum years of experience?'
                        desc='(Select one)'
                        id='experience'

                        val={propsData.jobofferSet ? propsData.jobofferSet.experience : null}
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
                      {errors.experience && <ErrorMessage message={errors.experience} />}
                      <Input
                        label='Maximum budget for the role'
                        desc='(e.g. &pound;50000 or &pound;400 per day)'
                        name='remuneration'
                        val={propsData.jobofferSet ? propsData.jobofferSet['remuneration'] : null}
                        placeholder='Enter number'
                        type='text'
                        id='budget'
                        errors={errors.remuneration}
                      />

                      {errors.remuneration && <ErrorMessage message={errors.remuneration} />}
                      <Radio
                        label='5. How many interview stages will there be for this role?'
                        desc='(Select one)'
                        id='stages'
                        val={propsData.jobofferSet ? propsData.jobofferSet.interviewStages : null}
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
                      {errors.interviewStages && <ErrorMessage message={errors.interviewStages} />}
                      <Radio
                        label='6. Expected new start date?'
                        desc='(Select one)'
                        id='startIn'
                        val={propsData.jobofferSet ? propsData.jobofferSet.startIn : null}
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
                      {errors.startIn && <ErrorMessage message={errors.startIn} />}
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