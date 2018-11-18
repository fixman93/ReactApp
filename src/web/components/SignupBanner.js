import React from 'react'
import './SignupBanner.css'
import { Link } from 'react-router-dom'
import camera from 'assets/images/hands-with-camera@2x.png'
import puzzle from 'assets/images/hand-puzzle@2x.png'
import clock from 'assets/images/hand-time@2x.png'
import quotes from 'assets/images/invalid-name@2x.png'

export const SignupBanner = () => (
  <div className='signup-banner'>
    <div className='container'>
      <h2 className='text-center'>Need a job?
<br />
        <Link to='/talent/sign-up'>Sign Up</Link> to OneApp</h2>
      <div className='row signup-banner-squares'>
        <div className='col'>
          <div className='square square-personal'>
            <div className='square-info'>
              <h4>We’re accurate</h4>
              <p>Our matching algorithim
cares about skills,
not role titles</p>
            </div>
            <img src={camera} alt='hand with a camera' width='99.5px' height='199.2px' />
          </div>
        </div>
        <div className='col'>
          <div className='square square-accurate'>
            <div className='square-info'>
              <h4>We’re personal</h4>
              Our video profiles speed
up the hiring process
for everyone

            </div>
            <img src={puzzle} alt='hand with a puzzle piece' width='110px' height='259.4px' />
          </div>
        </div>
        <div className='col'>
          <div className='square square-transparent'>
            <div className='square-info'>
              <h4>We’re transparent</h4>
              <p>Our timeline allows
tracking through the
whole hiring journey</p>
            </div>
            <img src={clock} alt='hand with a clock' width='120px' height='228.3px' />
          </div>
        </div>
      </div>
      <div className='quotes text-center'>
        <img src={quotes} alt='quotes symbol' width='47px' height='15px' />
        <h4>Great vision without great
<br />people is irrelevant.</h4>
        <span>Jim Collins</span>
      </div>
    </div>
  </div>
)

export default SignupBanner
