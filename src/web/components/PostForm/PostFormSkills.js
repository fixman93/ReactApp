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
      newSkillInputActive: true,
      error: ""
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.propsData.jobofferSet.skills) {
      this.setState({
        skills: this.props.propsData.jobofferSet.skills,
      })
    }
  }

  handleAddSkill = async (name) => {
    let skills = [...this.state.skills];
    // can't add same skill twice
    if (skills.find(s => s.id === name.id)) {
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



  handleSkillDropdownClick = async (e, skill) => {
    this.setState({
      newSkillInputActive: true
    });
    // e is experience level, skill is skill object
    // if skill is in state skills array
    if (this.state.skills.find(sk => sk.id === skill.id)) {
      // add all state skills to new array
      let newSkills = [...this.state.skills]
      // find the skill to in the array
      let skl = newSkills.find(sk => sk.id === skill.id)
      // find skill index in the array
      let sklId = newSkills.findIndex(sk => sk.id === skill.id)
      // add experience level to found skill
      skl = Object.assign({}, skl, { "level": e })
      // replace skill in array with new skill including experience level
      await newSkills.splice(sklId, 1, skl)
      // set new skills array
      await this.setState({
        skills: newSkills
      })
    }
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
        await this.props.onSubmit({
          skills: [...this.state.skills]
        });
      }
    })


  }

  render() {
    const { heading, onBack, propsData } = this.props;
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


                <UIContainer className="post-form">
                  {error !== "" && <ErrorMessage message={error} />}
                  <SkillList
                    fromBack={propsData.jobofferSet && propsData.jobofferSet.skills ? true : false}
                    experience={propsData.jobofferSet ? propsData.jobofferSet.skills : null}
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
