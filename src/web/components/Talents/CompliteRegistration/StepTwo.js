import React, { Component } from "react";
import PropTypes from "prop-types";
import UIContainer from "common/UIContainer";
import FeaturedTitle from "common/FeaturedTitle";
import Radio from "common/Forms/Radio";
import Input from 'common/Forms/Input'
import { Query } from "react-apollo";
import BlueArrow from '../../../../assets/images/blue-arrow.svg'
import { GET_SKILLS } from "../../../../services/queries";
import ErrorMessage from '../../../../common/Error/ErrorMessage';
import { setInput, setError } from "../../../../common/Forms/helpers";

class StepTwo extends Component {
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
    let names = ['remote', 'currentSalary', 'expectedSalary', 'travel', 'visaSponsorship', 'startIn'];

    // clear the errors
    await this.setState({ errors: {} });

    // map through elements
    await names.map(async name => {
      // it's radio input
      if (name !== 'currentSalary' && name !== 'expectedSalary') {

        let isAtLeastOneChecked = list.filter(item => item.name === name && item.checked).length === 1 ? true : false;
        let valueToAdd = list.find(item => item.name === name && item.checked);

        if (isAtLeastOneChecked) {
          setInput(this, name, valueToAdd.value);
        } else {
          setError(this, name, 'Please select one option');
        }

        // it's classic input - salary inputs
      } else {
        let hasValue = list.find(item => item.name === name).value !== '' ? true : false;
        let toAdd = list.find(el => el.name === name);
        let isNumber = (/^[0-9\s]*$/.test(toAdd.value));

        if (hasValue) {
          if (isNumber) {
            await setInput(this, name, toAdd.value);
          } else {
            await setError(this, name, 'Please type a number');
          }
        } else {
          await setError(this, name, 'Please type salary');
        }
      }


    })

    if (Object.keys(this.state.errors).length === 0) {
      this.props.onSubmit({ ...this.state.input })
    }


  }


  render() {
    const { heading, } = this.props;
    const { errors } = this.state;
    return (
      <Query query={GET_SKILLS}>
        {data => {
          //   const skills = data && data.data && data.data.allSkills;
          // data.data.allSkills.edges;

          return (
            <form
              ref={this.formRef}
              className="form"
              onSubmit={this.handleSubmit}
            >
              <FeaturedTitle
                title={heading.title}
                desc={heading.desc}
                color={heading.color}
              />
              <UIContainer>
                <Radio
                  label="1. Remote working?"
                  desc="(Select one)"
                  id="remote"
                  name="remote"
                  options={[
                    {
                      id: "permanent",
                      label: "Yes",
                      value: "1",
                      name: "remote"
                    },
                    {
                      id: "noRemote",
                      label: "No",
                      value: "0",
                      name: "remote"
                    },
                    {
                      id: "onlyRemote",
                      label: "Only remote",
                      value: "2",
                      name: "remote"
                    }
                  ]}
                />
                {errors.remote && <ErrorMessage message={errors.remote} />}
                <div className="row form-row">
                  <Input
                    id='currentSalary'
                    label='2. Current annual salary'
                    type='text'
                    placeholder='Enter Salary'
                    name='currentSalary'
                  />
                  {errors.currentSalary && <ErrorMessage message={errors.currentSalary} />}
                  <Input
                    id='expectedSalary'
                    label='Annual salary expectations'
                    type='text'
                    placeholder='Enter Expected Salary'
                    name='expectedSalary'
                  />
                  {errors.expectedSalary && <ErrorMessage message={errors.expectedSalary} />}
                </div>
                <Radio
                  label="3. Willing to travel abroad for business?"
                  desc="(Select one)"
                  id="travel"
                  name="travel"
                  options={[
                    {
                      id: "travelYes",
                      label: "Yes",
                      value: "1",
                      name: "travel"
                    },
                    {
                      id: "traveln",
                      label: "No",
                      value: "0",
                      name: "travel"
                    }
                  ]}
                />
                {errors.travel && <ErrorMessage message={errors.travel} />}
                <Radio
                  label="4. Do you require visa sponsorship?"
                  desc="(Select one)"
                  id="visaSponsorship"
                  name="visaSponsorship"
                  options={[
                    {
                      id: "visaYes",
                      label: "Yes",
                      value: "1",
                      name: "visaSponsorship"
                    },
                    {
                      id: "visaNo",
                      label: "No",
                      value: "0",
                      name: "visaSponsorship"
                    }
                  ]}
                />
                {errors.visaSponsorship && <ErrorMessage message={errors.visaSponsorship} />}
                <Radio
                  label="5. Expected new start date?"
                  desc="(Select one)"
                  id="startIn"
                  name="startIn"
                  options={[
                    { id: "now", label: "Immediately", value: "1", name: "startIn" },
                    { id: "1week", label: "1 week", value: "2", name: "startIn" },
                    { id: "2week", label: "2 week", value: "3", name: "startIn" },
                    { id: "1month", label: "1 month", value: "4", name: "startIn" },
                    { id: "2month", label: "2 month", value: "5", name: "startIn" },
                    { id: "3month+", label: "3 month+", value: "6", name: "startIn" }
                  ]}
                />
                {errors.startIn && <ErrorMessage message={errors.startIn} />}
              </UIContainer>
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
        }}
      </Query>
    );
  }
}

export default StepTwo;
