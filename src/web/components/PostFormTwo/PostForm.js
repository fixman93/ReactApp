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
    const list = Array.from(this.formRef.current.elements);

    // clear the errors
    await this.setState({
      errors: {}
    })


    // map through dom elements
    await list.map(element => {
      // if radio input, check if is checked and add to input object
      if (element.type === 'radio' && element.name !== '') {
        if (element.checked) {
          this.setInputProperty(element);
        }
      } else {
        // if is not radio input check if it has value
        if (element.value !== '') {
          this.setInputProperty(element);
        } else {
          //else add error
          if (element.name !== '') {
            this.setError("global", "Please fill the form")
          }
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
                  {errors['global'] && <ErrorMessage message={errors['global']} />}
                  {educationLevels && (
                    <EducationRadio
                      label='1. Highest level of education?'
                      desc='(Select one)'
                      id='educationLevel'
                      name='educationLevelId'
                      options={educationLevels}
                    />
                  )}
                  {questions && questions[0] && (
                    <DynamicRadio
                      label={`2. ${questions[0].node.question.standardquestion.question.question}`}
                      desc='(Select one)'
                      id='firstQuestion'
                      name="remote"
                      options={questions[0].node.question}
                    />
                  )}
                  {questions && questions[1] && (
                    <DynamicRadio
                      label={`3. ${questions[1].node.question.standardquestion.question.question}`}
                      desc='(Select one)'
                      id='secondQuestion'
                      name="managing"
                      options={questions[1].node.question}
                    />
                  )}
                  {questions && questions[2] && (
                    <DynamicRadio
                      label={`4. ${questions[2].node.question.standardquestion.question.question}`}
                      desc='(Select one)'
                      id='thirdQuestion'
                      name="travel"
                      options={questions[2].node.question}
                    />
                  )}

                  <Radio
                    label='5. Will you offer Visa sponsorship?'
                    desc='(Select one)'
                    id='experience'
                    name='offersSponsorship'
                    options={[
                      { id: '8', label: 'Yes', value: true, name: 'offer' },
                      { id: '9', label: 'No', value: false, name: 'offer' }
                    ]}
                  />
                  <Input
                    label='6. Any additional comments?'
                    desc='(On the talent you’re looking for or the role specifications)'
                    name='spec'
                    placeholder='Provide further details…'
                    type='text'
                    id='spec'
                  />
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