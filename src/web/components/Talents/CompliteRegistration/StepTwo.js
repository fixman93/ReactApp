import React, { Component } from "react";
import PropTypes from "prop-types";
import UIContainer from "common/UIContainer";
import FeaturedTitle from "common/FeaturedTitle";
import Radio from "common/Forms/Radio";
import Input from 'common/Forms/Input'
import Checkbox from "common/Forms/Checkbox"
import { Query } from "react-apollo";
import SkillList from "web/components/common/SkillList";
import NewSkill from "web/components/common/NewSkill";
import BlueArrow from '../../../../assets/images/blue-arrow.svg'
import { GET_SKILLS } from "../../../../services/queries";

class StepTwo extends Component {
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
                <Radio
                  label="1. Remote working?"
                  desc="(Select one)"
                  id="employment"
                  name="contractLength"
                  options={[
                    {
                      id: "permanent",
                      label: "Yes",
                      value: "1",
                      name: "contractLength9"
                    },
                    {
                      id: "contract",
                      label: "No",
                      value: "0",
                      name: "contractLength8"
                    },
                    {
                      id: "contract8",
                      label: "Only remote",
                      value: "2",
                      name: "contractLength7"
                    }
                  ]}
                />
                <div className="row form-row">
                  <Input
                    id='postcode'
                    label='2. Current annual salary'
                    type='text'
                    placeholder='Enter Salary'
                    name='postcode'
                  />
                  <Input
                    id='postcode'
                    label='Annual salary expectations'
                    type='text'
                    placeholder='Enter Salary'
                    name='postcode'
                  />
                </div>
                <Radio
                  label="3. Willing to travel abroad for business?"
                  desc="(Select one)"
                  id="employment"
                  name="contractLength"
                  options={[
                    {
                      id: "travely",
                      label: "Yes",
                      value: "1",
                      name: "travely"
                    },
                    {
                      id: "traveln",
                      label: "No",
                      value: "0",
                      name: "traveln"
                    }
                  ]}
                />
                <Radio
                  label="4. Do you require visa sponsorship?"
                  desc="(Select one)"
                  id="employment"
                  name="contractLength"
                  options={[
                    {
                      id: "visay",
                      label: "Yes",
                      value: "1",
                      name: "visay"
                    },
                    {
                      id: "visan",
                      label: "No",
                      value: "0",
                      name: "visan"
                    }
                  ]}
                />
                <Radio
                  label="5. Expected new start date?"
                  desc="(Select one)"
                  id="employment"
                  name="contractLength"
                  options={[
                    { id: "i1", label: "Immediately", value: "1", name: "i1" },
                    { id: "i2", label: "1 week", value: "2", name: "i2" },
                    { id: "i3", label: "2 week", value: "3", name: "i3" },
                    { id: "i4", label: "1 month", value: "4", name: "i4" },
                    { id: "i5", label: "2 month", value: "5", name: "i5" },
                    { id: "i6", label: "3 month+", value: "6", name: "i6" }
                  ]}
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

export default StepTwo;
