import React, { Component } from "react";
import PropTypes from "prop-types";

import { graphql, compose } from 'react-apollo'

import UIContainer from "common/UIContainer";
import FeaturedTitle from "common/FeaturedTitle";
import Radio from "common/Forms/Radio";
import { Query } from "react-apollo";
import SkillList from "web/components/common/SkillList";
import Dropdown from 'common/Forms/Dropdown'
import NewSkill from "web/components/common/NewSkill";
import BlueArrow from '../../../../assets/images/blue-arrow.svg'
import "./RegisterRole.css";
import { GET_SKILLS, ALL_ROLES } from "../../../../services/queries";
import ErrorMessage from "../../../../common/Error/ErrorMessage";

class RegisterRole extends Component {
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
      dropdownValue: ""
    };
    this.formRef = React.createRef();
    this.dropdownRef = React.createRef()
  }

  componentDidMount = () => {
    window.addEventListener('click', this.handleOutsideDropdownClick)

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

  handleAddSkill = name => {
    let sk = this.state.skills.slice();

    if (!sk.includes(name)) {
      // checks if name isn't already there
      this.setState(prevState => ({
        skills: [...prevState.skills, name],
        newSkillInputActive: false
      }));
    } else {
      // closes the menu if it alredy exists
      return;
    }
  };

  handleRemoveSkill = name => {
    this.setState(prevState => ({
      skills: prevState.skills.filter(item => item.skill !== name)
    }));
  };

  handleSkillDropdownClick = value => {
    this.setState({
      newSkillInputActive: true
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let names = ['roleId', 'contractLength']
    let list = Array.from(this.formRef.current.elements);

    // clears the errors
    await this.setState({
      errors: {}
    })

    await names.map(async name => {

      // check if it is at least one checked with the name
      if (name === 'contractLength') {

        let isAtLeastOneChecked =
          list.filter(el => el.name === name && el.checked).length === 1 ?
            true : false;
        // find the checked one
        let addInput = list.find(el => el.name === name && el.checked)

        if (isAtLeastOneChecked) {
          // if one is checked add it to input object
          await this.setState(prevState => ({
            input: Object.assign({}, prevState.input, { [name]: addInput.value })
          }))
        } else {
          // add error otherwise
          await this.setState(prevState => ({
            errors: Object.assign({}, prevState.errors, { [name]: "Please select one option" })
          }))
        }
      } else if (name === 'roleId') {
        // if role id, dropdown and no value 
        if (this.state.dropdownValue === '') {
          // add error
          await this.setState(prevState => ({
            errors: Object.assign({}, prevState.errors, { [name]: "Please select a role" })
          }))
        } else {
          // else add roleId
          await this.setState(prevState => ({
            input: Object.assign({}, prevState.errors,
              { "role": this.state.dropdownValue, "roleId": this.state.roleId })
          }))
        }
      }

      // if there are less then 5 skills 
      if (this.state.skills.length < 5) {
        // add error
        await this.setState(prevState => ({
          errors: Object.assign({}, prevState.errors, { 'skills': "Please add at least 5 skills" })
        }))
      }

    })

    // if no errors
    if (Object.keys(this.state.errors).length === 0) {
      //  call onSubmit function with input object and skills passed
      this.props.onSubmit({ ...this.state.input, skills: this.state.skills })

    }
  }



  render() {
    const { heading, roles } = this.props;
    const { newSkillInputActive, skills, errors, dropdownActive, dropdownValue } = this.state;
    const rolesArr = roles && roles.allRoles && roles.allRoles.edges;
    return (
      <Query query={GET_SKILLS}>
        {data => {
          //   const skills = data && data.data && data.data.allSkills;
          // data.data.allSkills.edges;

          return (
            <React.Fragment>

              <FeaturedTitle
                title={heading.title}
                desc={heading.desc}
                color={heading.color}
              />
              <form
                ref={this.formRef}
                className="form"
                onSubmit={this.handleSubmit}
              >
                <UIContainer>
                  <Radio
                    label='2. Type of employment?'
                    desc='(Select one)'
                    id='employment'
                    name='contractLength'
                    options={[
                      { id: 'permanent', label: 'Permanent (Full Time)', value: '1', name: 'contractLength' },
                      { id: 'contract', label: 'Contract (Fixed Term)', value: '0', name: 'contractLength' }
                    ]}
                  />
                  {errors.contractLength && <ErrorMessage message={errors.contractLength} />}

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
                    data={rolesArr}
                    dataToMap='name'
                    refProp={this.dropdownRef}
                    errors={errors.roleId}
                  />
                  {errors.roleId && <ErrorMessage message={errors.roleId} />}


                  <div className="SelectSkills form-input-group" >
                    <label>2. What are your skills?
                      <span>Tag a maximum of 15, include technical, soft & management skills</span></label>
                    {errors.skills && <ErrorMessage message={errors.skills} />}
                    <div style={{ display: "flex" }}>
                      <SkillList
                        skills={skills}
                        onRemove={this.handleRemoveSkill}
                        onClick={this.handleSkillDropdownClick}
                      />
                      {newSkillInputActive && (
                        <NewSkill
                          placeholder="Enter new skill..."
                          data={data}
                          onAdd={this.handleAddSkill}
                        />
                      )}
                    </div>
                  </div>
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
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}


export default compose(
  graphql(ALL_ROLES, { name: "roles" }),
)(RegisterRole);
