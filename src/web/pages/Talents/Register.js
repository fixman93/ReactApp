import React, { Component } from "react";
import PostPage from "../../../web/pages/PostPage";
import { Mutation, Query } from "react-apollo";
import TalentHeader from "../../../common/TalentHeader";
import RegisterRole from "../../components/Talents/Register";
import RegisterDetail from "../../components/Talents/RegisterDetail";
import { ADD_TALENT } from "services/mutations";

import "./Register.css";
import ErrorMessage from "../../../common/Error/ErrorMessage";

class TalentRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      page: 1,
      serverErrorResponse: []
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
    if (this.state.page < 2) {
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
    const { input, page, serverErrorResponse } = this.state;
    return (
      <Mutation
        mutation={ADD_TALENT}
        onCompleted={(data) => {
          if (data.candidateJoin.ok) {

            this.props.history.push({ pathName: '/talent/email', state: { registration: 'talent' } })
          }
        }
        }

        onError={(errors) => {
          this.setState({ serverErrorResponse: errors.graphQLErrors });
        }}
      >
        {addTalent => {
          return (
            <div className="TalentRegistration">
              <PostPage>
                <TalentHeader activeId={page} />
                {page === 1 && (
                  <RegisterRole
                    heading={{
                      title: "Welcome, let’s figure you out",
                      color: "white"
                    }}
                    onBack={this.prevPage}
                    onSubmit={this.handleStep}
                  />
                )}
                {page === 2 && (
                  <RegisterDetail
                    heading={{
                      title: "Got it. Now get your profile",
                      desc: "We’ll get you going with a job",
                      color: "white"
                    }}
                    onStep={this.handleStep}
                    onBack={this.prevPage}
                    serverErrors={serverErrorResponse}
                    onSubmit={() => {
                      addTalent({
                        variables: {
                          input: {
                            fullName: input.fullName,
                            email: input.email,
                            password: input.password,
                            contract: input.contractLength === 1 ? false : true,
                            permanent: input.contractLength !== 1 ? false : true,
                            //skills: input.skills.map(sk => sk.id)
                            rolesoughtSet: [
                              {
                                roleId: input.roleId,
                                order: 1,
                                experience: 1
                              }
                            ]
                          }

                        }
                      })
                    }}

                  />
                )}

              </PostPage>

            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default TalentRegister;
