import React, { Component } from "react";
import PropTypes from "prop-types";
import UIContainer from "common/UIContainer";
import FeaturedTitle from "common/FeaturedTitle";
import Radio from "common/Forms/Radio";
import Checkbox from "common/Forms/Checkbox"
import { Query } from "react-apollo";
import SkillList from "web/components/common/SkillList";
import NewSkill from "web/components/common/NewSkill";
import BlueArrow from '../../../../assets/images/blue-arrow.svg'
import "./RegisterRole.css";
import { GET_SKILLS } from "../../../../services/queries";

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
      errors: {}
    };
    this.formRef = React.createRef();
  }

  handleAddSkill = name => {
    this.setState(prevState => ({
      skills: [...prevState.skills, name],
      newSkillInputActive: false
    }));
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
                {/* <Radio
                  label="2. Type of employment?"
                  desc="(Select one)"
                  id="employment"
                  name="contractLength"
                  options={[
                    {
                      id: "permanent",
                      label: "Permanent (Full Time)",
                      value: "1",
                      name: "contractLength"
                    },
                    {
                      id: "contract",
                      label: "Contract (Fixed Term)",
                      value: "0",
                      name: "contractLength"
                    }
                  ]}
                /> */}
                <Checkbox
                  label='1. What type of employment are you looking for?'
                  desc='(Select if apply)'
                  id='employmentType'
                  name='contractLength'
                  options={[
                    { name: 'permanent', id: 'permanent', label: 'Permanent (Full Time)', value: true },
                    { name: 'contract', id: 'contract', label: 'Contract (Fixed Term)', value: true }
                  ]}
                  errors={errors.contractLength}
                />
                <div className="SelectSkills form-input-group">
                  <label>2. What are your skills? <span>Tag a maximum of 15, include technical, soft & management skills</span></label>
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

export default RegisterRole;
