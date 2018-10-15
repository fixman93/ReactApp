import React, { Component } from "react";
import PropTypes from "prop-types";
import UIContainer from "common/UIContainer";
import FeaturedTitle from "common/FeaturedTitle";
import Radio from "common/Forms/Radio";
import Checkbox from "common/Forms/Checkbox"
import Input from 'common/Forms/Input'
import Dropdown from 'common/Forms/Dropdown'
import { Query } from "react-apollo";
import SkillList from "web/components/common/SkillList";
import NewSkill from "web/components/common/NewSkill";
import BlueArrow from '../../../../assets/images/blue-arrow.svg'
import { GET_SKILLS } from "../../../../services/queries";

class StepOne extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    heading: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      input: {},
      skills: [],
      userId: null,
      newSkillInputActive: true,
      errors: {},
      dropdownActive: false,
      dropdownValue: ''
    };
    this.formRef = React.createRef()
    this.dropdownRef = React.createRef()
  }

  componentDidMount = () => {
    window.addEventListener('click', this.handleOutsideDropdownClick)
    this.setState({
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


  handleError = (inputName, value, checked) => {
    if (!value) {
      console.log('error', inputName)
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [inputName]: 'This field is required'
        }
      }))
    }
  }
  render() {
    const { heading, onSubmit, onBack, propsData } = this.props;
    const { newSkillInputActive, skills, errors } = this.state;
    const { dropdownActive, dropdownValue } = this.state
    return (
      <Query query={GET_SKILLS}>
        {data => {
          //   const skills = data && data.data && data.data.allSkills;
          // data.data.allSkills.edges;

          return (
            <form
              ref={this.formRef}
              className="form"
              onSubmit={async e => {
                e.preventDefault();
                await onSubmit(this.formRef);
              }}
            >
              <FeaturedTitle
                title={heading.title}
                desc={heading.desc}
                color={heading.color}
              />
              <UIContainer>
                <div className="row form-row">
                  <Dropdown
                    label={`1. What's the role`}
                    id='role'
                    type='text'
                    placeholder='Select from the list'
                    name='roleId'
                    onItemClick={this.handleDropdownItemClick}
                    onInputClick={this.handleDropdownClick}
                    dropdownActive={dropdownActive}
                    defaultValue={dropdownValue}
                    dataToMap='name'
                    refProp={this.dropdownRef}
                    errors={errors.roleId}
                  />
                  <Input
                    id='postcode'
                    label='Where do you currently work?'
                    desc='(Not working? Type: Currently Looking)'
                    type='text'
                    placeholder='Enter company postcode'
                    name='postcode'
                  />
                </div>

                <div className="row form-row">
                  <Dropdown
                    label='Years of experience in the role?'
                    id='role'
                    type='text'
                    placeholder='Select from the list'
                    name='roleId'
                    onItemClick={this.handleDropdownItemClick}
                    onInputClick={this.handleDropdownClick}
                    dropdownActive={dropdownActive}
                    defaultValue={dropdownValue}
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
                </div>

                <div className="row form-row">
                  <Dropdown
                    label=''
                    id='role'
                    type='text'
                    placeholder='Select secondary role'
                    name='roleId'
                    onItemClick={this.handleDropdownItemClick}
                    onInputClick={this.handleDropdownClick}
                    dropdownActive={dropdownActive}
                    defaultValue={dropdownValue}
                    dataToMap='name'
                    refProp={this.dropdownRef}
                    errors={errors.roleId}
                  />
                  <Radio
                    label=''
                    id='employment'
                    name='contractLength'
                    options={[
                      { id: 'permanent', label: 'Permanent (Full Time)', value: '1', name: 'contractLength' },
                      { id: 'contract', label: 'Contract (Fixed Term)', value: '0', name: 'contractLength' }
                    ]}
                    errors={errors.contractLength}
                  />
                </div>

                <div className="row form-row">
                  <Dropdown
                    label='3. Highest level of education?'
                    id='role'
                    type='text'
                    placeholder='Select secondary role'
                    name='roleId'
                    onItemClick={this.handleDropdownItemClick}
                    onInputClick={this.handleDropdownClick}
                    dropdownActive={dropdownActive}
                    defaultValue={dropdownValue}
                    dataToMap='name'
                    refProp={this.dropdownRef}
                    errors={errors.roleId}
                  />
                  <Dropdown
                    label='Year obtained'
                    id='role'
                    type='text'
                    placeholder='Select secondary role'
                    name='roleId'
                    onItemClick={this.handleDropdownItemClick}
                    onInputClick={this.handleDropdownClick}
                    dropdownActive={dropdownActive}
                    defaultValue={dropdownValue}
                    dataToMap='name'
                    refProp={this.dropdownRef}
                    errors={errors.roleId}
                  />
                </div>
                <Input
                  id='postcode'
                  label='4. Postcode'
                  type='text'
                  placeholder='Enter company postcode'
                  name='postcode'
                />

                <Input
                  id='postcode'
                  label='5. Phone number'
                  type='text'
                  placeholder='Enter company postcode'
                  name='postcode'
                />


              </UIContainer>
              <div className="button-container">
                {/* <button
                  type="button"
                  className="btn btn-white-orange no-background"
                  onClick={() => onBack()}
                >
                  Back
                </button> */}
                <button type="submit" className="btn btn-white-blue">
                  Next <img src={BlueArrow} />
                </button>
              </div>
            </form>
          );
        }}
      </Query>
    );
  }
}

export default StepOne;
