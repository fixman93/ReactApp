import React, { Component } from "react";
import PropTypes from "prop-types";
import UIContainer from "common/UIContainer";
import FeaturedTitle from "common/FeaturedTitle";
import { Query } from "react-apollo";
import Input from 'common/Forms/Input'
import SkillList from "web/components/common/SkillList";
import NewSkill from "web/components/common/NewSkill";
import BlueArrow from '../../../../assets/images/blue-arrow.svg'
import { GET_SKILLS } from "../../../../services/queries";

class StepFiveOne extends Component {
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
              <div className="videoExample">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/k_ioqWJuNHA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                <div className="video-content">
                  <h2>View our 5 Golden Tips</h2>
                  <p>We’re here to guide you every step of the way</p>
                </div>
              </div>
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

export default StepFiveOne;
