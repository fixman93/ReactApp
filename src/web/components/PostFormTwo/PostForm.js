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
import { setInput, setError } from '../../../common/Forms/helpers';

export class PostForm extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = {
      input: {},
      errors: {}
    }
  }




  handleSubmit = async () => {
    let names = ['educationLevelId', 'managing', 'remote', 'travel', 'offer', 'spec']
    const list = Array.from(this.formRef.current.elements);

    // clear the errors
    await this.setState({
      errors: {}
    })

    // map throught element names
    await names.map(name => {
      if (name !== 'spec') {
        // if name is not spec - it's radio input
        // checks if is at least one checked with the name
        let isAtLeastOneChecked = list.filter(el => el.name === name && el.checked === true).length === 1 ? true : false;
        // find checked one
        let toAdd = list.find(el => el.name === name && el.checked);
        if (isAtLeastOneChecked) {
          // if one is checked, add it to input object
          setInput(this, name, toAdd.value)
        } else {
          // add error
          setError(this, name, 'Please select one option')

        }

      } else {
        // it's spec - input
        let ifHasValue = list.find(el => el.name === name && el.value !== '') ? true : false;
        let toAdd = list.find(el => el.name === name);

        if (ifHasValue) {
          // if value, add to input object
          setInput(this, name, toAdd.value)

        } else {
          // else add error
          setError(this, name, 'Please add job specifications')

        }
      }

    })
  }


  render() {
    const { heading, onBack, propsData } = this.props
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
                      educations: { ...educationLevels }
                    });
                  }
                }}
              >
                <UIContainer className='post-form'>

                  {educationLevels && (
                    <Radio
                      label='1. Highest level of education?'
                      desc='(Select one)'
                      id='educationLevel'
                      name='educationLevelId'
                      val={propsData.jobofferSet ? propsData.jobofferSet.educationLevelId : null}
                      options={
                        educationLevels.map(level =>
                          Object.assign({}, {
                            id: level.node.id,
                            label: level.node.name,
                            value: level.node.id,
                            name: "educationLevelId"
                          })
                        )
                      }
                    />
                  )}


                  {questions && questions.map((question, i) => {
                    {/* map through questions */ }
                    return <React.Fragment key={i}>
                      {/* return radio for each question, they all are radio  */}
                      <Radio
                        /* set label based on question */
                        label={`${i + 2}. ${question.node.question.standardquestion.question.question}`}
                        desc='(Select one)'
                        id={question.node.question.standardquestion.id}
                        /* set question id to radio id
                           there are three questions, first is about remote job so set remote as name
                           second is about managing, name is managing
                           last is about travelling so name is travel */
                        name={
                          question.node.question.standardquestion.id === questions[0].node.question.standardquestion.id ? 'remote' :
                            question.node.question.standardquestion.id === questions[1].node.question.standardquestion.id ? 'managing' :
                              'travel'
                        }
                        /* val helps to set answers when user clicks back on form */
                        val={
                          question.id === questions[0].id ?
                            (propsData.jobofferSet ? propsData.jobofferSet.remote : null) :
                            question.id === questions[1].id ?
                              (propsData.jobofferSet ? propsData.jobofferSet.managing : null) :
                              (propsData.jobofferSet ? propsData.jobofferSet.travel : null)}
                        /* map through answers */
                        options={Object.keys(question.node.question.standardquestion.answers).map((el, i) =>
                          Object.assign({}, {
                            /* ids for answers are repetetive so in front of them are names */
                            id: question.node.question.standardquestion.id === questions[0].node.question.standardquestion.id ? `remote_${el}` :
                              question.node.question.standardquestion.id === questions[1].node.question.standardquestion.id ? `managing_${el}` :
                                `travel_${el}`,
                            label: el,
                            value: el,
                            name: question.node.question.standardquestion.id === questions[0].node.question.standardquestion.id ? 'remote' :
                              question.node.question.standardquestion.id === questions[1].node.question.standardquestion.id ? 'managing' :
                                'travel'
                          })
                        )}
                      />
                      {question.id === questions[0].id ?
                        (errors.remote && <ErrorMessage message={errors.remote} />) :
                        question.id === questions[1].id ?
                          (errors.managing && <ErrorMessage message={errors.managing} />) :
                          errors.remote && <ErrorMessage message={errors.remote} />}
                    </React.Fragment>

                  })}


                  <Radio
                    label='5. Will you offer Visa sponsorship?'
                    desc='(Select one)'
                    id='offer'
                    name='offer'
                    val={propsData.jobofferSet ?
                      propsData.jobofferSet.offer === 'true' ? true : false : null}
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
                    val={propsData.jobofferSet ? propsData.jobofferSet.spec : null}
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