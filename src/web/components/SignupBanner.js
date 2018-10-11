import React from 'react'
import './SignupBanner.css'
import {Link} from 'react-router-dom'
import camera from 'assets/images/hands-with-camera@2x.png'
import puzzle from 'assets/images/hand-puzzle@2x.png'
import clock from 'assets/images/hand-time@2x.png'
import quotes from 'assets/images/invalid-name@2x.png'

export const SignupBanner = () => (
  <div className='signup-banner'>
    <div className='container'>
      <h2 className='text-center'>It’s hard to find best matched jobs,<br />
      <Link to='/talent/sign-up'>Sign Up</Link> for a better way to get hired</h2>
      <div className='row signup-banner-squares'>
        <div className='col'>
          <div className='square square-personal'>
            <div className='square-info'>
              <h4>Personal</h4>
              <p>Showcase yourself:<br />get to know employers<br />and their offers</p>
            </div>
            <img src={camera} alt='hand with a camera' width='99.5px' height='199.2px' />
          </div>
        </div>
        <div className='col'>
          <div className='square square-accurate'>
            <div className='square-info'>
              <h4>Accurate</h4>
              <p>Quickly find jobs:<br />be precisely matched<br />with available offers</p>
            </div>
            <img src={puzzle} alt='hand with a puzzle piece' width='110px' height='259.4px' />
          </div>
        </div>
        <div className='col'>
          <div className='square square-transparent'>
            <div className='square-info'>
              <h4>Transparent</h4>
              <p>Take back control:<br />track every step<br />of your job hunt </p>
            </div>
            <img src={clock} alt='hand with a clock' width='120px' height='228.3px' />
          </div>
        </div>
      </div>
      <div className='quotes text-center'>
        <img src={quotes} alt='quotes symbol' width='47px' height='15px' />
        <h4>Choose a job you love and you’ll never<br />have to work a day in your life</h4>
        <span>Confusius</span>
      </div>
    </div>
  </div>
)

export default SignupBanner
