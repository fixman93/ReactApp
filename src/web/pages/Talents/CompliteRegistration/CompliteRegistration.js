import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import TalentPage from "../TalentPage";
import TalentHeader from "../../../../common/TalentHeader";
import StepOne from '../../../components/Talents/CompliteRegistration/StepOne'
import StepTwo from '../../../components/Talents/CompliteRegistration/StepTwo'
import StepThree from '../../../components/Talents/CompliteRegistration/StepThree'
import StepFour from '../../../components/Talents/CompliteRegistration/StepFour'
import StepFiveOne from '../../../components/Talents/CompliteRegistration/StepFiveOne'
import StepFive from '../../../components/Talents/CompliteRegistration/StepFive'
import './CompliteRegistration.css'
import { Mutation } from 'react-apollo';
import { CANDIDATE_DETAILS } from '../../../../services/mutations';

import { history } from '../../../../App';

export class CompliteProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: {},
      page: 6,
      userId: null
    };
  }

  componentDidMount() {
    this.setState({
      userId: localStorage.getItem('userId')
    })
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

  handleStep = (data) => {
    this.setState(prevState => ({
      input: {
        ...prevState.input,
        ...data
      }
    }));
    this.nextPage();
  };

  render() {
    const { page, input, userId } = this.state;
    return (<Mutation mutation={CANDIDATE_DETAILS}
      onCompleted={() => {
        history.push({ pathName: '/talent/profile', state: { input, userId, fromRegister: true } })
      }} >
      {addTalent => {

        return (<div
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
                onSubmit={(e) => {

                  e.preventDefault();
                  addTalent({
                    variables: {
                      input: {
                        id: "Q2FuZGlkYXRlTm9kZToz",
                        educationLevelId: "RWR1Y2F0aW9uTGV2ZWxOb2RlOjE=",
                        reasonForChangeId: "UmVhc29uRm9yQ2hhbmdlTm9kZTox",
                        rolesoughtSet: [
                          {
                            candidateId: "Q2FuZGlkYXRlTm9kZToz",
                            roleId: "Um9sZU5vZGU6MTA=",
                            order: 6,
                            experience: 5,
                          },
                          {
                            candidateId: "Q2FuZGlkYXRlTm9kZToz",
                            roleId: "Um9sZU5vZGU6MTI=",
                            order: 8,
                            experience: 3,
                          }
                        ],
                        skill: [{ id: "U2tpbGxOb2RlOjE=" }],
                        candidateresponseSet: [
                          {
                            questionId: "UXVlc3Rpb25Ob2RlOjE=",
                            answers: { yes: "" },
                            candidateId: "Q2FuZGlkYXRlTm9kZToz"
                          },
                          {
                            questionId: "UXVlc3Rpb25Ob2RlOjI=",
                            answers: { yes: "" },
                            candidateId: "Q2FuZGlkYXRlTm9kZToz",
                          }
                        ],
                        portfolioSet: [
                          {
                            link: "https://www.linkedin.com/in/lancucki/",
                            candidateId: "Q2FuZGlkYXRlTm9kZToz"
                          },
                          {
                            link: "https://www.linkedin.com/in/bla/",
                            candidateId: "Q2FuZGlkYXRlTm9kZToz",
                          }
                        ],
                        jobSet: [
                          {
                            candidateId: "Q2FuZGlkYXRlTm9kZToz",
                            company: {
                              id: "Q29tcGFueU5vZGU6MQ==",
                            },
                            roleId: "Um9sZU5vZGU6OQ==",
                            startDate: "2000-05-01",
                          },
                        ],
                        permanent: true,
                        contract: false,
                        needsSponsorship: true,
                        noticePeriod: 20,
                        phoneNumber: "123412341234",
                        postcode: "qwer",
                        maxCommute: 45,
                        currentSalary: 54,
                        minimumSalary: 34,
                        desiredSalary: 23,
                        currentRate: 54,
                        minimumRate: 34,
                        desiredRate: 23,
                        linkedIn: "https://www.linkedin.com/in/lancucki/",
                      }
                    }
                  })
                }}
              />
            )}
          </TalentPage>

        </div>)
      }}
    </Mutation>
    );
  }
}

export default withRouter(CompliteProfile);