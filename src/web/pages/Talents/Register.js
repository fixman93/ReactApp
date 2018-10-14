import React, { Component } from "react";
import PostPage from "../../../web/pages/PostPage";
import { Mutation, Query } from "react-apollo";
import TalentHeader from "../../../common/TalentHeader";
import RegisterRole from "../../components/Talents/Register";
import RegisterDetail from "../../components/Talents/RegisterDetail";
import { ADD_TALENT } from "services/mutations";

import "./Register.css";

class TalentRegister extends Component {
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
    if (this.state.page < 2) {
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



  // @TODO: figure out if each step should save the data to the server
  render() {
    const { input, page } = this.state;
    return (
      <Mutation
        mutation={ADD_TALENT}
        variables={{
          input
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
                    onSubmit={addTalent}
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
