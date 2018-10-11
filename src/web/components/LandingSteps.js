import React from 'react'
import PropTypes from 'prop-types'
import './LandingSteps.css'

export const LandingSteps = ({step}) => (
  <div className='landing-steps'>
    <div className='background-line'></div>
    <div className={'preparation-line landing-step ' + (step === 1 ? 'active' : '')}>
      <span>Preparation</span>
    </div>
    <div className={'application-line landing-step ' + (step === 2 ? 'active' : '')}>
      <span>Applications</span>
    </div>
    <div className={'interviews-line landing-step ' + (step === 3 ? 'active' : '')}>
      <span>Interviews</span>
    </div>
  </div>
)

LandingSteps.propTypes = {
  step: PropTypes.number.isRequired
}

export default LandingSteps
