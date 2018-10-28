import React, { Component } from "react";
import UIContainer from "common/UIContainer";
import FeaturedTitle from "common/FeaturedTitle";
import NewSkill from "../common/NewSkill";
import SkillList from "../common/SkillList";
import { GET_SKILLS } from "services/queries";
import { Query } from "react-apollo";
import "./PostForm.css";
import ErrorMessage from "../../../common/Error/ErrorMessage";

export class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      skillIds: [],
      newSkillInputActive: true,
      error: ""
    };
    this.formRef = React.createRef();
  }

  handleAddSkill = name => {
    let skills = [...this.state.skills];

    if (skills.includes(name)) {
      return;
    } else {
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

    this.setState({ error: "" }, async () => {
      if(this.state.skills.length < 5) {
        await this.setState({ error: "You need to have at least 5 skills"})
      } else {
        await this.setState({ error: ""})
        await this.skillIds();
        await this.props.onSubmit({
          skills: [...this.state.skills],
          skillsIds: [...this.state.skillIds]
        });
      }
    })

    
  }
    
  render() {
    const { heading, onBack, onSubmit, propsData } = this.props;
    const { skills, newSkillInputActive, error } = this.state;

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
                onSubmit={this.handleSubmit}>
             >
                  
                <UIContainer className="post-form">
                  {error !== "" && <ErrorMessage message={error} />}
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
