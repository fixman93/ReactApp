import React, { Component } from "react";
import PropTypes from "prop-types";
import UIContainer from "common/UIContainer";
import FeaturedTitle from "common/FeaturedTitle";
import { Query } from "react-apollo";
import SkillList from "web/components/common/SkillList";
import NewSkill from "web/components/common/NewSkill";
import BlueArrow from '../../../../assets/images/blue-arrow.svg'
import { GET_SKILLS } from "../../../../services/queries";
import ErrorMessage from "../../../../common/Error/ErrorMessage";

class StepThree extends Component {
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
      skillIds: [],
      newSkillInputActive: true,
      error: ""
    };
    this.formRef = React.createRef();
  }

  handleAddSkill = name => {
    let skills = [...this.state.skills];

    // can't add same skill twice
    if (skills.includes(name)) {
      // it will close the menu
      return;
    } else {
      // else add it to skills array
      this.setState(prevState => ({
        skills: [...prevState.skills, name],
        newSkillInputActive: false
      }))
    }
  };

  handleRemoveSkill = name => {
    this.setState(prevState => ({
      skills: prevState.skills.filter(item => item.skill !== name)
    }));
  };

  skillIds = () => {
    let skillIds = this.state.skills.map(skill => skill.id);
    this.setState({
      skillIds: skillIds
    });
  };

  handleSkillDropdownClick = value => {
    this.setState({
      newSkillInputActive: true
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // rest error to blank
    this.setState({ error: "" }, async () => {
      // then checks if there are at least 5 skills added
      if (this.state.skills.length < 5) {
        // if not add error
        await this.setState({ error: "You need to have at least 5 skills" })
      } else {
        // else resets the error, pass skills and ids to onSubmit function
        await this.setState({ error: "" })
        await this.skillIds();
        await this.props.onSubmit({
          skills: [...this.state.skills],
          skillsIds: [...this.state.skillIds]
        });
      }
    })
  }


  render() {
    const { heading } = this.props;
    const { newSkillInputActive, skills, error } = this.state;
    return (
      <Query query={GET_SKILLS}>
        {data => {

          return (
            <form
              ref={this.formRef}
              className="form"
              onSubmit={this.handleSubmit}
            >
              <FeaturedTitle
                title={heading.title}
                desc={heading.desc}
                color={heading.color}
              />
              <UIContainer>
                {error !== '' && <ErrorMessage message={error} />}
                <div className="SelectSkills form-input-group">
                  <div style={{ display: 'flex' }}>
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
                  Next <img src={BlueArrow} alt="blue-arrow" />
                </button>
              </div>
            </form>
          );
        }}
      </Query>
    );
  }
}

export default StepThree;
