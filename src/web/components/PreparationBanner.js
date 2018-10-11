import React from 'react'
import LandingSteps from './LandingSteps'
import card from 'assets/images/kid-card@2x.png'
import ready from 'assets/images/ready@2x.png'

export const PreparationBanner = () => (
  <div className='company-steps preparation-banner'>
    <div className="container text-center">
      <LandingSteps step={1} />
      <div className='content'>
        <h3>Our AI sorts through talents<br />that match your needs</h3>
        <p>Make informed decisions with matched percentages based on question<br />
        comparisions, for each talent that applies to your posted jobs</p>
      <img src={card} className='landing-card' width='900px' alt='talents match' />
      <img src={ready} className='person-image' width='370.4px' height='380px' alt='kid' />
      </div>
    </div>
  </div>
)

export default PreparationBanner
