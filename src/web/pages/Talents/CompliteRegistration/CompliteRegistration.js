import React, { Component } from 'react'
import TalentPage from "../TalentPage";
import TalentHeader from "../../../../common/TalentHeader";
import UserTalent from '../../UserTalent'
import StepOne from '../../../components/Talents/CompliteRegistration/StepOne'
import StepTwo from '../../../components/Talents/CompliteRegistration/StepTwo'
import StepThree from '../../../components/Talents/CompliteRegistration/StepThree'
import StepFour from '../../../components/Talents/CompliteRegistration/StepFour'
import StepFiveOne from '../../../components/Talents/CompliteRegistration/StepFiveOne'
import StepFive from '../../../components/Talents/CompliteRegistration/StepFive'
import './CompliteRegistration.css'


export class CompliteProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: {},
      page: 1,
      userId: null
    };
  }

  prevPage = () => {
    if (this.state.page > 1) {
      this.setState(prevState => ({
        page: prevState.page - 1
      }));
    }
  };

  nextPage = () => {
    if (this.state.page < 6) {
      this.setState(prevState => ({
        page: prevState.page + 1
      }));
    }
  };

  handleStep = (formRef, optionalData) => {
    console.log(formRef)
    const { userId } = this.state;
    let data = {};
    const elements = formRef.current.elements;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].value !== "") {
        data[elements[i].name] = elements[i].value;
      }
    }
    this.setState(prevState => ({
      input: {
        ...prevState.input,
        ...data
      }
    }));
    console.log(this.state.input);
    this.nextPage();
  };

  render() {
    const { page } = this.state;
    return (
      <div
        className='talent-page TalentComplete-Registration'
      >
        <TalentPage>
          <TalentHeader activeId={page} />
          {page === 1 && (
            <StepOne
              heading={{
                title: "Your current situation",
                color: "white"
              }}
              onBack={this.prevPage}
              onSubmit={this.handleStep}
            />
          )}
          {page === 2 && (
            <StepTwo
              heading={{
                title: "Tell us about yourself",
                desc: "",
                color: "white"
              }}
              onBack={this.prevPage}
              onSubmit={this.handleStep}
            // onSubmit={addTalent}
            />
          )}
          {page === 3 && (
            <StepThree
              heading={{
                title: "List all of your skills ",
                desc: "Include things like: technical, soft & management skills",
                color: "white"
              }}
              onBack={this.prevPage}
              onSubmit={this.handleStep}
            // onSubmit={addTalent}
            />
          )}
          {page === 4 && (
            <StepFour
              heading={{
                title: "Link yourself up ",
                desc: "",
                color: "white"
              }}
              onBack={this.prevPage}
              onSubmit={this.handleStep}
            // onSubmit={addTalent}
            />
          )}
          {page === 5 && (
            <StepFiveOne
              heading={{
                title: "The final step is here",
                desc: "Companies would like to learn more about you, it should take you only a minute",
                color: "white"
              }}
              onBack={this.prevPage}
              onSubmit={this.handleStep}
            // onSubmit={addTalent}
            />
          )}
          {page === 6 && (
            <StepFive
              heading={{
                title: "",
                desc: "",
                color: "white"
              }}
              onBack={this.prevPage}
              onSubmit={this.handleStep}
            // onSubmit={addTalent}
            />
          )}
        </TalentPage>

      </div>
    )
  }
}

export default CompliteProfile