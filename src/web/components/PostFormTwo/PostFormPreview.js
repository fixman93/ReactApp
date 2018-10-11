import React, { Fragment } from 'react'
import UIContainer from 'common/UIContainer'
import PostEmployer from '../common/PostEmployer'
import InfoLink from '../common/InfoLink'
import JobInfoTag from '../common/JobInfoTag'
import Requirements from '../common/Requirements'
import SkillItem from '../common/SkillItem'
import pound from 'assets/images/pound.svg'
import './PostFormPreview.css'

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

const PostFormPreview = () => (
  <Fragment>
    <UIContainer className='container preview-container'>
      <PostEmployer
        title='User Experience (UX) Designer'
        postedAt='Posted on 22/07/2017'
        desc='Nike | Clothes | 35,800 employees'
      />
      <div className='employer-container single-row'>
        <InfoLink
          imgSrc=''
          text='Video'
        />
        <div className='application-btn-container'>
          <JobInfoTag color='red' text='88% match' />
          <JobInfoTag imgSrc={pound} text='70,000 per annum' />
          <JobInfoTag text='5 interview stages' />
          <JobInfoTag text='Canary Wharf, London' />
        </div>
      </div>

      <div className='employer-container-content'>
        <h3>Who we are?</h3>
        <p className='employer-text'>
          We care about design, so much so our first hire was a designer. A year and
          rounds of funding later we're now looking to hire our second designer and
          boost our team. We're looking for a senior designer to come into our team
          to help embed a design across the company. They'll be able to do this by
          working not only on our customer facing product, but also our internal tools
          and brand/style-guide.
        </p>
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
      <button type="button" className="btn btn-white-orange no-background">Back</button>
      <button type="button" className="btn btn-white-orange">Next</button>
    </div>
  </Fragment>
)

export default PostFormPreview