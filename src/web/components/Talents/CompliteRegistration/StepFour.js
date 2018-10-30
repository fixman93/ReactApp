import React, { Component } from "react";
import PropTypes from "prop-types";
import UIContainer from "common/UIContainer";
import FeaturedTitle from "common/FeaturedTitle";
import { Query } from "react-apollo";
import Input from 'common/Forms/Input'
import SkillList from "web/components/common/SkillList";
import NewSkill from "web/components/common/NewSkill";
import BlueArrow from '../../../../assets/images/blue-arrow.svg'
import { ALL_COMPANIES } from "../../../../services/queries";
import ErrorMessage from "../../../../common/Error/ErrorMessage";
import { setInput, setError } from "../../../../common/Forms/helpers";

class StepFour extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    heading: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      input: {},
      companies: [],
      userId: null,
      newCompanyAdd: true,
      errors: {}
    };
    this.formRef = React.createRef();
  }

  handleAddCompany = name => {
    this.setState(prevState => ({
      companies: [...prevState.companies, name],
      newCompanyAdd: false
    }));
  };

  handleRemoveCompany = name => {
    this.setState(prevState => ({
      companies: prevState.companies.filter(item => item.name !== name)
    }));
  };

  handleCompanyDropdownClick = value => {
    this.setState({
      newCompanyAdd: true
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    let list = Array.from(this.formRef.current.elements);

    // clear errors
    await this.setState({ errors: {} });

    let item = list.find(item => item.name === 'portfolio')
    if (item && item.value) {
      await setInput(this, 'portfolio', item.value)
    } else {
      await setError(this, 'portfolio', 'Please add your portfolio')
    }



    if (Object.keys(this.state.errors).length === 0) {
      await this.props.onSubmit({ ...this.state.input, companies: this.state.companies })
    }

  }


  render() {
    const { heading, onBack, } = this.props;
    const { newCompanyAdd, errors, companies } = this.state;
    return (
      <Query query={ALL_COMPANIES}>
        {data => {

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
                <Input
                  id='portfolio'
                  label='1. Portfolio website'
                  type='text'
                  placeholder='Enter portfolio URL your own, behance, dribbble, github)'
                  name='portfolio'
                />
                {errors.portfolio && <ErrorMessage message={errors.portfolio} />}
                {errors.skills && <ErrorMessage message={errors.skills} />}
                <div className="SelectSkills form-input-group">
                  <label>2. Previous companies and clients</label>
                  <SkillList

                    companies={true}
                    skills={companies}
                    onRemove={this.handleRemoveCompany}
                    onClick={this.handleCompanyDropdownClick}
                  />
                  {newCompanyAdd && (
                    <NewSkill

                      companies={true}
                      placeholder="Enter new client"
                      data={data}
                      onAdd={this.handleAddCompany}
                    />
                  )}
                </div>
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

export default StepFour;
