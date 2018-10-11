import React from 'react'
import LandingSteps from './LandingSteps'
import card from 'assets/images/card-talents-in-progress-3-x@2x.png'
import ready from 'assets/images/ready-3@2x.png'

export const InterviewsBanner = () => (
  <div className='interviews-banner company-steps'>
    <div className="container text-center">
      <LandingSteps step={3} />
      <div className='content'>
        <h3>Control your hiring process</h3>
        <p>Select talents for interviews, see constant live<br />updates and track your hiring progress</p>
        <img src={card} className='landing-card' width='900px' alt='hiring process' />
        <img src={ready} className='person-image' width='370.4px' height='380px' alt='old man' />
      </div>
    </div>
  </div>
)

export default InterviewsBanner
