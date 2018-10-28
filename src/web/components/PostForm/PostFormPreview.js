import React, { Fragment } from 'react'
import UIContainer from 'common/UIContainer'
import PostEmployer from '../common/PostEmployer'
import InfoLink from '../common/InfoLink'
import JobInfoTag from '../common/JobInfoTag'
import Requirements from '../common/Requirements'
import SkillItem from '../common/SkillItem'
import pound from 'assets/images/pound.svg'
import './PostFormPreview.css'
import { Query } from 'react-apollo'
import { GET_EMPLOYER } from '../../../services/queries'

let start = [
  { id: 'immediately', label: 'immediately', value: '0', name: 'startIn' },
  { id: 'oneWeek', label: '1 week', value: '1', name: 'startIn' },
  { id: 'twoWeeks', label: '2 weeks', value: '2', name: 'startIn' },
  { id: 'oneMonth', label: '1 month', value: '4', name: 'startIn' },
  { id: 'twoMonths', label: '2 months', value: '8', name: 'startIn' },
  { id: 'threeMonths', label: '3+ months', value: '12', name: 'startIn' }
]

let visa = [
  { id: '8', label: 'Yes', value: true, name: 'offer' },
  { id: '9', label: 'No', value: false, name: 'offer' }
]

class PostFormPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requirements: [],
      educations: [],
      answers: [],
      questions: []
    }
  }

  async componentDidMount() {
    const { propsData: { jobofferSet } } = this.props;
    await Object.values(jobofferSet.educations).map(d => {
      this.setState(prevState => ({
        educations: [...prevState.educations, d.node]
      }))
    })

    await Object.values(jobofferSet.questions).map(d => {

      this.setState(prevState => ({
        questions: [...prevState.questions, d.node.question]
      }))

    })


    await this.setState({
      requirements: [
        {
          title: 'Offering',
          value: jobofferSet.contractLength === '1' ? 'Permanent role' : 'Contract'
        },
        {
          title: 'Remote job?',
          value: jobofferSet.remote.slice(-1) === 'x' ? 'Yes' :
            jobofferSet.remote.slice(-1) === 'y' ? 'No' : 'Only Remote'
        },
        {
          title: 'Expected start',
          value: start.find(p => p.value == jobofferSet.startIn).label
        },
        {
          title: 'Qualifications',
          value: this.state.educations.find(e => e.id === jobofferSet.educationLevelId).name
        },
        {
          title: 'Visa Sponsorship',
          value: jobofferSet.offer === 'true' ? 'Yes' : "No"
        },
        {
          title: 'Travel for business',
          value: jobofferSet.remote.slice(-1) === 'x' ? 'Yes' : 'No'
        }
      ]
    })

  }

  render() {
    const { onSubmit, onBack, history, propsData, handleAddData } = this.props;
    return (<Query
      query={GET_EMPLOYER}
      variables={{ id: localStorage.getItem('userId') }}

    >
      {({ loading, data, error }) => {
        const employer = data && data.employer
        const jobofferSet = data && data.employer
          && data.employer.jobofferSet && data.employer.jobofferSet.edges &&
          data.employer.jobofferSet.edges[0] &&
          data.employer.jobofferSet.edges[0].node
        loading && <div>Loading...</div>

        return (<Fragment>
          <form
            onSubmit={async e => {
              e.preventDefault()
              //handleAddData(jobofferSet)
              await onSubmit()
            }}
          >
            <UIContainer className='container preview-container'>
              <PostEmployer
                title={propsData.jobofferSet.role}
                postedAt='Posted on 22/07/2017'
                desc={propsData.jobofferSet.spec}
              />
              <div className='employer-container single-row'>
                <InfoLink
                  // imgSrc={employer.logo || ''}
                  text='Video'
                />
                <div className='application-btn-container'>
                  <JobInfoTag color='red' text='88% match' />
                  <JobInfoTag imgSrc={pound} text={`${propsData.jobofferSet.remuneration} per annum`} />
                  <JobInfoTag text={`${propsData.jobofferSet.interviewStages} interview stages`} />
                  {employer && <JobInfoTag text={employer.address} />}
                </div>
              </div>

              <div className='employer-container-content'>
                {/* {employer.description && (
                    <Fragment>
                      <h3>Who we are?</h3>
                      <p className='employer-text'>
                        {employer.description}
                      </p>
                    </Fragment>
                  )} */}
                {this.state.requirements && <Requirements
                  data={this.state.requirements}
                />}
                <h3>We are looking for these skills</h3>
                <div className='skills-container'>
                  {propsData.jobofferSet.skills.map((skill, index) => (
                    <SkillItem key={skill.id} text={skill.skill} />
                  ))}
                </div>
                <h3>Additional Requirements?</h3>
                <p>
                  It's a challenging, but highly rewarding role working in a startup that is
                  growing fast, and supporting many very different products. You'll be asked
                  to take on areas where you're not an expert. Sometimes you'll need to make
                  quick decisions to get it shipped and other times you'.
                </p>
              </div>
            </UIContainer>
            <div className="button-container">
              <button
                type="button"
                className="btn btn-white-orange no-background"
                onClick={() => onBack()}
              >
                Back
               </button>
              <button type="submit" className="btn btn-white-orange">Post job</button>
            </div>
          </form>
        </Fragment>
        )
      }}
    </Query>)
  }
}



export default PostFormPreview