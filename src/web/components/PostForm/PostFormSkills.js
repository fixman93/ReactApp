import React, { Component } from "react";
import UIContainer from "common/UIContainer";
import FeaturedTitle from "common/FeaturedTitle";
import NewSkill from "../common/NewSkill";
import SkillList from "../common/SkillList";
import { GET_SKILLS } from "services/queries";
import { Query } from "react-apollo";
import "./PostForm.css";

export class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      skillIds: [],
      newSkillInputActive: true
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

  render() {
    const { heading, onBack, onSubmit } = this.props;
    const { skills, newSkillInputActive } = this.state;
    return (
      <Query query={GET_SKILLS}>
        {data => {
          return (
            <React.Fragment>
              <FeaturedTitle
                title={heading.title}
                desc={heading.desc}
                color={heading.color}
              />
              <form
                ref={this.formRef}
                id="postFormSkills"
                className="form"
                onSubmit={async e => {
                  e.preventDefault();
                  await this.skillIds();
                  await onSubmit(this.formRef, {
                    skill: [...this.state.skillIds]
                  });
                }}
              >
                <UIContainer className="post-form">
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
                </UIContainer>
                <div className="button-container">
                  <button
                    type="button"
                    className="btn btn-white-orange no-background"
                    onClick={() => onBack()}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-white-orange">
                    Next
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

export default PostForm;
