import React, { Component } from "react";
import PropTypes from "prop-types";
import UIContainer from "common/UIContainer";
import FeaturedTitle from "common/FeaturedTitle";
import Radio from "common/Forms/Radio";
import Checkbox from "common/Forms/Checkbox"
import Input from 'common/Forms/Input'
import Dropdown from 'common/Forms/Dropdown'
import { Query, graphql, compose } from "react-apollo";
import SkillList from "web/components/common/SkillList";
import NewSkill from "web/components/common/NewSkill";
import BlueArrow from '../../../../assets/images/blue-arrow.svg'
import { GET_SKILLS, ALL_ROLES, ALL_EDUCATION_LEVELS } from "../../../../services/queries";
import ErrorMessage from '../../../../common/Error/ErrorMessage';
import { setInput, setError } from "../../../../common/Forms/helpers";

class StepOne extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    heading: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      input: {},
      skills: [],
      userId: null,
      newSkillInputActive: true,
      errors: {},
      dropdowns: [
        {
          name: "roleId",
          dropdownActive: false,
          dropdownValue: ""
        },
        {
          name: "roleId_primary",
          dropdownActive: false,
          dropdownValue: ""
        },
        {
          name: "roleId_secondary",
          dropdownActive: false,
          dropdownValue: ""
        },
        {
          name: "educationLevelId",
          dropdownActive: false,
          dropdownValue: ""
        },
        {
          name: "yearObtained",
          dropdownActive: false,
          dropdownValue: ""
        }
      ]
    };
    this.formRef = React.createRef()
    this.firstRef = React.createRef()
    this.secondRef = React.createRef()
    this.thirdRef = React.createRef()
    this.fourthRef = React.createRef()
    this.fifthRef = React.createRef()
  }

  componentDidMount = () => {
    window.addEventListener('click', this.handleOutsideDropdownClick)
    this.setState({
      userId: localStorage.getItem('userId')
    })
  }

  componentWillUnmount = () => {
    window.removeEventListener('click', this.handleOutsideDropdownClick)
  }

  /* handleOutsideDropdownClick = (e) => {
 
     if (this.state.dropdowns.some(d => d.dropdownActive === true) &&
       (!this.firstRef.current.contains(e.target) ||
         !this.secondRef.current.contains(e.target) ||
         !this.thirdRef.current.contains(e.target) ||
         !this.fourthRef.current.contains(e.target) ||
         !this.fifthRef.current.contains(e.target))) {
 
       this.state.dropdowns.map(dn => {
         let drop = { ...dn }
         drop['dropdownActive'] = false;
         this.setState({
           [this.state.dropdowns.find(dr => dr.name)]: drop
         })
 
       })
     }
   } */

  handleDropdownClick = (name) => {

    if (!this.state.dropdowns.find(d => d.name === name).dropdownActive) {
      let drop = this.state.dropdowns.find(d => d.name === name);
      drop['dropdownActive'] = true;
      this.setState(prevState => ({
        [this.state.dropdowns.find(d => d.name === name)]: drop
      }))
    } else {
      let drop = this.state.dropdowns.find(d => d.name === name);
      drop['dropdownActive'] = false;
      this.setState(prevState => ({
        [this.state.dropdowns.find(d => d.name === name)]: drop
      }))
    }
  }

  handleDropdownItemClick = (name, value) => {
    let drop = this.state.dropdowns.find(d => d.name === name);
    drop['dropdownValue'] = value;
    drop['dropdownActive'] = false;
    this.setState({
      [this.state.dropdowns.find(d => d.name === name)]: drop
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    let list = Array.from(this.formRef.current.elements);
    let names = ['roleId', 'companyName', 'roleId_primary', 'experience', 'roleId_secondary', 'experience_secondary', 'educationLevelId', 'yearObtained', 'postcode', 'phoneNumber'];

    // clear the errors
    await this.setState({ errors: {} })

    // map through names
    names.map(async name => {

      // if one of these is name - it's dropdown
      if (name === ('roleId' || 'roleId_primary' || 'roleID_secondary' || 'educationLevelId' || 'yearObtained')) {
        // find the dropdown from array, pass the dropdown value from found dropdown
        if (name !== ('roleId')) {
          if (this.state.dropdowns.find(dd => dd.name === name).dropdownValue !== "") {
            await setInput(this, name, this.state.dropdowns.find(dd => dd.name === name).dropdownValue)
          } else {
            await setError(this, name, "Please select one option")
          }
        } else {
          await setInput(this, name, this.state.dropdowns.find(dd => dd.name === name).dropdownValue)
        }
      }

      // if one of these is name - it's radio input
      else if (name === ('experience' || 'experience_secondary')) {
        let isAtLeastOneChecked = list.filter(el => el.name === name && el.checked === true).length === 1 ? true : false;
        let radio = list.find(item => item.name === name && item.checked);
        if (isAtLeastOneChecked) {
          await setInput(this, name, radio.value)
        } else {
          await setError(this, name, "Please select one option")
        }


        // it's classic input
      } else {
        let found = list.find(item => item.name === name);
        if (found && found.value !== '') {
          await setInput(this, name, found.value)
        } else {
          await setError(this, name, "Field is required")
        }
      }
    })

    if (Object.keys(this.state.errors).length === 0) {
      await this.props.onSubmit({ ...this.state.input })
    }
  }




  render() {
    const { heading } = this.props;
    const { errors } = this.state;
    const { dropdowns } = this.state
    const roles = this.props.roles
      && this.props.roles.allRoles &&
      this.props.roles.allRoles.edges
    const educationLevels = this.props.educations
      && this.props.educations.allEducationLevels &&
      this.props.educations.allEducationLevels.edges
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
          <div className="row form-row">
            <Dropdown
              label={`1. What is your current role ?`}
              id='role'
              type='text'
              placeholder='Select from the list'
              name='roleId'
              onItemClick={(e) => {
                this.handleDropdownItemClick("roleId", e)
              }}
              onInputClick={() => this.handleDropdownClick("roleId")}
              dropdownActive={dropdowns.find(d => d.name === 'roleId').dropdownActive}
              defaultValue={dropdowns.find(d => d.name === 'roleId').dropdownValue}
              dataToMap='name'
              data={roles}
              refProp={this.firstRef}
            />
            {errors.roleId && <ErrorMessage message={errors.roleId} />}
            <Input
              id='companyName'
              label='Where do you currently work ?'
              desc='(Not working? Type: Currently Looking)'
              type='text'
              placeholder='Enter company name'
              name='companyName'
            />
            {errors.roleId_primary && <ErrorMessage message={errors.roleId_primary} />}
          </div>

          <div className="row form-row">
            <Dropdown
              label='What role you are looking for ?'
              id='role'
              type='text'
              placeholder='Select from the list'
              name='roleId_primary'
              onItemClick={(e) => this.handleDropdownItemClick("roleId_primary", e)}
              onInputClick={() => this.handleDropdownClick("roleId_primary")}
              dropdownActive={dropdowns.find(d => d.name === 'roleId_primary').dropdownActive}
              defaultValue={dropdowns.find(d => d.name === 'roleId_primary').dropdownValue}
              dataToMap='name'
              data={roles}
              refProp={this.secondRef}
            />
            {errors.roleId_primary && <ErrorMessage message={errors.roleId_primary} />}
            <Radio
              label='Years of experience in the role ?'
              desc='(Select one)'
              id='experience'
              name='experience'
              options={[
                { id: 'sixMonths', label: '6 months', value: 0.5, name: 'experience' },
                { id: 'oneYear', label: '1 year', value: 1, name: 'experience' },
                { id: 'twoYears', label: '2 years', value: 2, name: 'experience' },
                { id: 'threeYears', label: '3 years', value: 3, name: 'experience' },
                { id: 'fourYears', label: '4 years', value: 4, name: 'experience' },
                { id: 'fiveYears', label: '5+ years', value: 5, name: 'experience' }
              ]}

            />
          </div>
          {errors.contractLength_primary && <ErrorMessage message={errors.contractLength_primary} />}
          <div className="row form-row">
            <Dropdown
              label=''
              id='role'
              type='text'
              placeholder='Select secondary role'
              name='roleId_secondary'
              onItemClick={(e) => this.handleDropdownItemClick("roleId_secondary", e)}
              onInputClick={() => this.handleDropdownClick("roleId_secondary")}
              dropdownActive={dropdowns.find(d => d.name === 'roleId_secondary').dropdownActive}
              defaultValue={dropdowns.find(d => d.name === 'roleId_secondary').dropdownValue}
              data={roles}
              dataToMap='name'
              refProp={this.thirdRef}
            />
            {errors.roleId_secondary && <ErrorMessage message={errors.roleId_secondary} />}
            <Radio
              label=''
              id='experience_secondary'
              name='experience_secondary'
              options={[
                {
                  id: 'sixMonths_secondary',
                  label: '6 months', value: 0.5, name: 'experience_secondary'
                },
                {
                  id: 'oneYear_secondary',
                  label: '1 year', value: 1, name: 'experience_secondary'
                },
                {
                  id: 'twoYears_secondary',
                  label: '2 years', value: 2, name: 'experience_secondary'
                },
                {
                  id: 'threeYears_secondary',
                  label: '3 years', value: 3, name: 'experience_secondary'
                },
                {
                  id: 'fourYears_secondary',
                  label: '4 years', value: 4, name: 'experience_secondary'
                },
                {
                  id: 'fiveYears_secondary',
                  label: '5+ years', value: 5, name: 'experience_secondary'
                }
              ]}
            />
            {errors.experience_secondary && <ErrorMessage message={errors.experience_secondary} />}
          </div>

          <div className="row form-row">
            <Dropdown
              label='3. Highest level of education ?'
              id='role'
              type='text'
              placeholder='Select from the list'
              name='educationLevelId'
              onItemClick={(e) => this.handleDropdownItemClick("educationLevelId", e)}
              onInputClick={() => this.handleDropdownClick("educationLevelId")}
              dropdownActive={dropdowns.find(d => d.name === 'educationLevelId').dropdownActive}
              defaultValue={dropdowns.find(d => d.name === 'educationLevelId').dropdownValue}
              dataToMap='name'
              data={educationLevels}
              refProp={this.fourthRef}
              errors={errors.roleId}
            />
            {errors.educationLevelId && <ErrorMessage message={errors.educationLevelId} />}
            <Dropdown
              label='Year obtained'
              id='role'
              type='text'
              placeholder='Select from the list'
              name='yearObtained'
              onItemClick={(e) => this.handleDropdownItemClick("yearObtained", e)}
              onInputClick={() => this.handleDropdownClick("yearObtained")}
              dropdownActive={dropdowns.find(d => d.name === 'yearObtained').dropdownActive}
              defaultValue={dropdowns.find(d => d.name === 'yearObtained').dropdownValue}
              dataToMap='name'
              data={[
                { node: { name: "One year", value: 1, id: "one" } },
                { node: { name: "Two years", value: 2, id: "two" } },
                { node: { name: "Three years", value: 3, id: "three" } }]}
              refProp={this.fifthRef}
              errors={errors.roleId}
            />
            {errors.yearObtained && <ErrorMessage message={errors.yearObtained} />}
          </div>
          <Input
            id='postcode'
            label='4. Postcode'
            type='text'
            placeholder='Enter your postcode'
            name='postcode'
          />
          {errors.postcode && <ErrorMessage message={errors.postcode} />}
          <Input
            id='phone-number'
            label='5. Phone number'
            type='text'
            placeholder='Enter your phone number'
            name='phoneNumber'
          />

          {errors.phoneNumber && <ErrorMessage message={errors.phoneNumber} />}
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

  }
}

export default compose(
  graphql(ALL_EDUCATION_LEVELS, { name: 'educations' }),
  graphql(ALL_ROLES, { name: 'roles' })
)(StepOne);
