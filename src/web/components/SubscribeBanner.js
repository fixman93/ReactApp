import React from 'react'
import ProfessionList from './ProfessionList'
import {Button} from 'common/Forms'
import hand from 'assets/images/hand-with-calculator@2x.png'
import radio from 'assets/images/icons/radio-button.svg'
import './SubscribeBanner.css'

export const SubscribeBanner = () => (
  <div className='subscribe-banner company-steps'>
    <div className="container text-center">
      <div className='content'>
        <h3>Our developers and designers</h3>
        <ProfessionList />
        <div className='subscribe-form'>
          <h3>One subscription plan</h3>
          <p>Start your journey with us for a £70 monthly subscription fee</p>
          <div className='float-left text-left'>
            <ul>
              <li>
                <h6><img src={radio} alt='radio' /> Get matched</h6>
                <p>Get matched with talents that<br />match your requirements</p>
              </li>
              <li>
                <h6><img src={radio} alt='radio' /> Unlimited everything</h6>
                <p>Unlimited job posts, talent matches,<br />profiles and interviews</p>
              </li>
              <li>
                <h6><img src={radio} alt='radio' /> Pay 7% for your hires</h6>
                <p>Get matched with talents that<br />match your requirements</p>
              </li>
            </ul>
          </div>
          <div className='float-right price-info'>
            <div className='price'>
              <div className='price-value'><sup>£</sup>70 <span>+</span> 7<sup>%</sup></div>
              <span className='float-left desc'>per month</span>
              <span className='float-right desc'>per hire</span>
            </div>
            <Button text='Create Account' className='btn-orange' />
          </div>
        </div>
      </div>
      <img src={hand} className='hand-calculator' alt='hand with calculator' width='274px' />
    </div>
  </div>
)

export default SubscribeBanner
