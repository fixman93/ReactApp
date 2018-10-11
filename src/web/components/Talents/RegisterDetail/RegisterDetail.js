import React, { Component } from "react";
import { Mutation } from "react-apollo";
import PropTypes from "prop-types";
import Input from "common/Forms/Input";
import UIContainer from "common/UIContainer";
import FeaturedTitle from "common/FeaturedTitle";
import ErrorMessage from "common/Error/ErrorMessage";
import RegisterHand from "../../../../assets/images/CompanyRegistration/hands-holding@3x.png";
import { ADD_COMPANY } from "services/mutations";

export class RegisterDetail extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    heading: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: null
    };
    this.formRef = React.createRef();
  }

  handleSubmit = () => {
    const elements = this.formRef.current.elements;
    let data = {};
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].value !== "") data[elements[i].name] = elements[i].value;
    }
    this.setState({
      input: data
    });
  };

  render() {
    const { history, onStep } = this.props;
    const { input, errors } = this.state;
    const { heading, onSubmit, onBack, propsData } = this.props;
    const error = errors && errors[0] && errors[0].message;
    return (
      <form
        ref={this.formRef}
        className="form firstStep"
        onSubmit={async e => {
          e.preventDefault();
          await onStep(this.formRef);
          await onSubmit();
        }}
      >
        <FeaturedTitle
          title={heading.title}
          desc={heading.desc}
          color={heading.color}
        />
        <UIContainer>
          <Input
            id="FullName"
            label="1. Full name"
            type="text"
            placeholder="Enter full name"
            name="fullName"
          />
          <Input
            id="companyEmail"
            label="2. Email address"
            type="email"
            placeholder="Enter email address"
            name="email"
          />
          <Input
            id="password"
            label="3. Password"
            type="password"
            placeholder="Enter password"
            name="password"
          />
          {error && <ErrorMessage message={error} />}
          <div className="login-button-container">
            <button type="submit" className="button">
              Create Profile
            </button>
          </div>
          <img src={RegisterHand} alt="Company Hand" className="RegisterHand" />
        </UIContainer>
      </form>
    );
  }
}

export default RegisterDetail;
