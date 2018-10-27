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

const skills = ['Sketch', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign',
  'User Experience', 'User Interface', 'Managin Team', 'Prototyping', 'iOS App',
  'Android App', 'Principle', 'Axure', 'Basic HTML/CSS', 'Wordpress']

const requirements = [
  {
    title: 'Offering',
    value: 'Permanent role'
  },
  {
    title: 'Remote job?',
    value: 'Some remote'
  },
  {
    title: 'Expected start',
    value: '1 month',
  },
  {
    title: 'Qualifications',
    value: 'A levels',
  },
  {
    title: 'Visa Sponsorship',
    value: 'No sponsorship'
  },
  {
    title: 'Travel for business',
    value: 'Required'
  }
]

const PostFormPreview = ({ onSubmit, onBack, history, propsData, handleAddData, ...props }) => (
  <Query
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
              title={data.roleId}
              postedAt='Posted on 22/07/2017'
              desc={data.spec}
            />
            <div className='employer-container single-row'>
              <InfoLink
                // imgSrc={employer.logo || ''}
                text='Video'
              />
              <div className='application-btn-container'>
                <JobInfoTag color='red' text='88% match' />
                <JobInfoTag imgSrc={pound} text={`${data.remuneration} per annum`} />
                <JobInfoTag text={`${data.interviewStages} interview stages`} />
                <JobInfoTag text='Canary Wharf, London' />
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
              <Requirements
                data={requirements}
              />
              <h3>We are looking for these skills</h3>
              <div className='skills-container'>
                {skills.map((skill, index) => (
                  <SkillItem key={skill + index} text={skill} />
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
            <button type="submit" className="btn btn-white-orange">Next</button>
          </div>
        </form>
      </Fragment>
      )
    }}
  </Query>
)

export default PostFormPreview