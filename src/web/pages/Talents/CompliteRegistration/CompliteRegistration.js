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
import { Query, Mutation } from 'react-apollo';
import { CANDIDATE_DETAILS } from '../../../../services/mutations';


export class CompliteProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: {},
      page: 1,
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
    const { userId } = this.state;
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
        this.props.history.push({ pathName: '/talent/profile', state: { input, userId } })
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
                  console.log({
                    input: {
                      id: userId,
                      educationLevelId: input.educationLevelId.id,
                      skill: input.skillsIds.map(sk => Object.assign({}, { "id": sk })),
                      permanent: true,
                      contract: false,
                      needsSponsorship: input.visaSponsorship === 1 ? true : false,
                      noticePeriod: 1,
                      phoneNumber: input.phoneNumber,
                      postcode: input.postcode,
                      maxCommute: 1,
                      currentSalary: input.currentSalary,
                      desiredSalary: input.expectedSalary,
                      rolesoughtSet: [{ candidateId: userId, roleId: input.roleId_primary.id, order: 13, experience: input.experience },
                      { candidateId: userId, roleId: input.roleId_secondary.id, order: 12, experience: input.experience_secondary }],
                      jobSet:
                        input.companies.map(company => {
                          return Object.assign({}, { roleId: input.roleId_primary.id, candidateId: userId, company: { name: company.name, id: company.id }, startDate: "2018-10-10" })

                        })

                    }
                  })
                  e.preventDefault();
                  addTalent({
                    variables: {
                      input: {
                        id: userId,
                        educationLevelId: input.educationLevelId.id,
                        skill: input.skillsIds.map(sk => Object.assign({}, { "id": sk })),
                        permanent: true,
                        contract: false,
                        needsSponsorship: input.visaSponsorship === 1 ? true : false,
                        noticePeriod: 1,
                        phoneNumber: input.phoneNumber,
                        postcode: input.postcode,
                        maxCommute: 1,
                        currentSalary: input.currentSalary,
                        desiredSalary: input.expectedSalary,
                        rolesoughtSet: [{ candidateId: userId, roleId: input.roleId_primary.id, order: 13, experience: input.experience },
                        { candidateId: userId, roleId: input.roleId_secondary.id, order: 12, experience: input.experience_secondary }],
                        jobSet:
                          input.companies.map(company => {
                            return Object.assign({}, { roleId: input.roleId_primary.id, candidateId: userId, company: { name: company.name, id: company.id }, startDate: "2018-10-10" })

                          })

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

export default CompliteProfile