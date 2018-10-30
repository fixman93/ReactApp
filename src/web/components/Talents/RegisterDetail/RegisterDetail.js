import React, { Component } from "react"
import PropTypes from "prop-types"
import { withRouter } from 'react-router-dom'
import Input from "common/Forms/Input"
import UIContainer from "common/UIContainer"
import FeaturedTitle from "common/FeaturedTitle"
import ErrorMessage from "common/Error/ErrorMessage"
import RegisterHand from "../../../../assets/images/CompanyRegistration/hands-holding@3x.png";
import './RegisterDetail.css'


let emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class RegisterDetail extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    heading: PropTypes.object
  };


  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {}
    };
    this.formRef = React.createRef();
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    let list = Array.from(this.formRef.current.elements);

    let names = ['fullName', 'email', 'password'];

    await this.setState({ errors: {} })

    names.map(name => {

      let hasValue = list.find(el => el.name == name).value.length !== 0 ? true : false;
      let toAdd = list.find(el => el.name == name)

      if (hasValue) {
        if (name === 'email') {

          this.setState(prevState => ({
            input: Object.assign({}, prevState.input, { [name]: toAdd.value })
          }))


        } else {

          if (toAdd.value.length < 8) {
            this.setState(prevState => ({
              errors: Object.assign({}, prevState.errors,
                { [name]: `${name === 'password' ? 'Password' : 'Name'} should be longer than 8 characters` })
            }))
          } else {

            this.setState(prevState => ({
              input: Object.assign({}, prevState.input, { [name]: toAdd.value })
            }))
          }

        }

      } else {

        this.setState(prevState => ({
          errors: Object.assign({}, prevState.errors,
            { [name]: "This field is required" })
        }))

      }

    })

    if (Object.keys(this.state.errors).length === 0) {
      await this.props.onStep({ ...this.state.input })
      await this.props.onSubmit({ ...this.state.input })
    }


  }



  render() {
    const { errors } = this.state;
    const { heading, serverErrors } = this.props;
    return (
      <form
        ref={this.formRef}
        className="form firstStep"
        onSubmit={this.handleSubmit}
      >
        <FeaturedTitle
          title={heading.title}
          desc={heading.desc}
          color={heading.color}
        />
        <UIContainer className="RegisterDetail">
          <Input
            id="FullName"
            label="1. Full name"
            type="text"
            placeholder="Enter full name"
            name="fullName"
          />
          {errors.fullName && <ErrorMessage message={errors.fullName} />}
          <Input
            id="companyEmail"
            label="2. Email address"
            type="email"
            placeholder="Enter email address"
            name="email"
          />
          {errors.email && <ErrorMessage message={errors.email} />}
          <Input
            id="password"
            label="3. Password"
            type="password"
            placeholder="Enter password"
            name="password"
          />
          {errors.password && <ErrorMessage message={errors.password} />}
          {serverErrors && serverErrors.map((err, i) => {
            return <ErrorMessage key={i} message={err.message} />
          })}
        </UIContainer>
        <div className="login-button-container">
          <button type="submit" className="btn btn-white-blue">
            Create Profile
            </button>
        </div>

        <img src={RegisterHand} alt="Company Hand" className="RegisterHand" />
      </form>
    );
  }
}

export default withRouter(RegisterDetail)
