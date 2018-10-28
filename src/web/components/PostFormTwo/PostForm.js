import React, { Component } from 'react'
import UIContainer from 'common/UIContainer'
import FeaturedTitle from 'common/FeaturedTitle'
import Radio from 'common/Forms/Radio'
import DynamicRadio from 'common/Forms/DynamicRadio/DynamicRadio'
import EducationRadio from 'common/Forms/Radio/EducationRadio'
import { Query } from 'react-apollo'
import Input from 'common/Forms/Input'
import './PostForm.css'
import { ALL_QUESTIONS } from '../../../services/queries'
import ErrorMessage from '../../../common/Error/ErrorMessage';

export class PostForm extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = {
      input: {},
      errors: {}
    }
  }

  setInputProperty = (element) => {
    this.setState(prevState => ({
      input: Object.assign({}, prevState.input, { [element.name]: element.value })
    }))
  }

  setError = (whichError, error) => {
    this.setState(prevState => ({
      errors: Object.assign({}, prevState.errors, { [whichError]: error })
    }))
  }


  handleSubmit = async () => {
    let names = ['educationLevelId', 'managing', 'remote', 'travel', 'offer', 'spec']
    const list = Array.from(this.formRef.current.elements);

    // clear the errors
    await this.setState({
      errors: {}
    })


    await names.map(name => {
      if (name !== 'spec') {

        let isAtLeastOneChecked = list.filter(el => el.name == name && el.checked == true).length == 1 ? true : false;
        let toAdd = list.find(el => el.name == name && el.checked);
        console.log(isAtLeastOneChecked, name)
        if (isAtLeastOneChecked) {

          this.setState(prevState => ({
            input: Object.assign({}, prevState.input,
              { [toAdd.name]: toAdd.value })
          }))

        } else {
          this.setState(prevState => ({
            errors: Object.assign({}, prevState.errors, { [name]: 'Please select one option' })
          }))

        }

      } else {

        let ifHasValue = list.find(el => el.name == name && el.value !== '') ? true : false;
        let toAdd = list.find(el => el.name == name);

        if (ifHasValue) {

          this.setState(prevState => ({
            input: Object.assign({}, prevState.input, { [toAdd.name]: toAdd.value })
          }))

        } else {

          this.setState(prevState => ({
            errors: Object.assign({}, prevState.errors, { [name]: 'Please add job specifications' })
          }))

        }
      }

    })
  }


  render() {
    const { heading, onBack, } = this.props
    const { errors } = this.state;
    return (
      <Query
        query={ALL_QUESTIONS}
      >
        {data => {
          const questions = data && data.data &&
            data.data.allStandardQuestions &&
            data.data.allStandardQuestions.edges
          const educationLevels = data && data.data &&
            data.data.allEducationLevels &&
            data.data.allEducationLevels.edges
          return (
            <React.Fragment>
              <FeaturedTitle
                title={heading.title}
                desc={heading.desc}
                color={heading.color}
              />
              <form
                ref={this.formRef}
                className='form'
                onSubmit={async e => {
                  e.preventDefault()
                  await this.handleSubmit()
                  if (Object.keys(this.state.errors).length === 0) {
                    await this.props.onSubmit({
                      ...this.state.input,
                      ...this.props.propsData,
                      educations: { ...educationLevels },
                      questions: { ...questions }
                    });
                  }
                }}
              >
                <UIContainer className='post-form'>

                  {educationLevels && (
                    <EducationRadio
                      label='1. Highest level of education?'
                      desc='(Select one)'
                      id='educationLevel'
                      name='educationLevelId'
                      options={educationLevels}
                    />
                  )}
                  {errors.educationLevelId && <ErrorMessage message={errors.educationLevelId} />}
                  {questions && questions[0] && (
                    <DynamicRadio
                      label={`2. ${questions[0].node.question.standardquestion.question.question}`}
                      desc='(Select one)'
                      id='firstQuestion'
                      name="remote"
                      options={questions[0].node.question}
                    />
                  )}
                  {errors.remote && <ErrorMessage message={errors.remote} />}
                  {questions && questions[1] && (
                    <DynamicRadio
                      label={`3. ${questions[1].node.question.standardquestion.question.question}`}
                      desc='(Select one)'
                      id='secondQuestion'
                      name="managing"
                      options={questions[1].node.question}
                    />
                  )}
                  {errors.managing && <ErrorMessage message={errors.managing} />}
                  {questions && questions[2] && (
                    <DynamicRadio
                      label={`4. ${questions[2].node.question.standardquestion.question.question}`}
                      desc='(Select one)'
                      id='thirdQuestion'
                      name="travel"
                      options={questions[2].node.question}
                    />
                  )}
                  {errors.travel && <ErrorMessage message={errors.travel} />}

                  <Radio
                    label='5. Will you offer Visa sponsorship?'
                    desc='(Select one)'
                    id='experience'
                    name='offer'
                    options={[
                      { id: '8', label: 'Yes', value: true, name: 'offer' },
                      { id: '9', label: 'No', value: false, name: 'offer' }
                    ]}
                  />
                  {errors.offer && <ErrorMessage message={errors.offer} />}
                  <Input
                    label='6. Any additional comments?'
                    desc='(On the talent you’re looking for or the role specifications)'
                    name='spec'
                    placeholder='Provide further details…'
                    type='text'
                    id='spec'
                  />
                  {errors.spec && <ErrorMessage message={errors.spec} />}
                </UIContainer>
                <div className="button-container">
                  <button
                    type="button"
                    className="btn btn-white-orange no-background"
                    onClick={() => onBack()}
                  >
                    Back
                </button>
                  <button type="submit" className="btn btn-white-orange">Next</button>
                </div>
              </form>
            </React.Fragment>
          )
        }}
      </Query>
    )
  }
}

export default PostForm