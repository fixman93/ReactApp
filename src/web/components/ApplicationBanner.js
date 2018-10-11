import React from 'react'
import LandingSteps from './LandingSteps'
import card from 'assets/images/indian-guy@2x.png'
import ready from 'assets/images/ready-2@2x.png'

export const ApplicationBanner = () => (
  <div className='application-banner company-steps'>
    <div className="container text-center">
      <LandingSteps step={2} />
      <div className='content'>
        <h3>See talent’s skills & personality</h3>
        <p>Review personalised profiles that capture skills,<br />experiences and personalities</p>
      <img src={card} className='landing-card' width='700px' alt="talent's profile" />
      <img src={ready} className='person-image' width='430' alt='indian guy' />
      </div>
    </div>
  </div>
)

export default ApplicationBanner
