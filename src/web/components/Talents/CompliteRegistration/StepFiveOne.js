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
    };
  }



  render() {
    const { heading, onSubmit, onBack } = this.props;
    const { newSkillInputActive, skills, errors } = this.state;
    return (<form
      ref={this.formRef}
      className="form"
      onSubmit={() => this.props.onSubmit({})}
    >
      <FeaturedTitle
        title={heading.title}
        desc={heading.desc}
        color={heading.color}
      />
      <div className="videoExample">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/k_ioqWJuNHA" frameborder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
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
  }
}


export default StepFiveOne;
