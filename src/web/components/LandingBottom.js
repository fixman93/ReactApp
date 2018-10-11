import React from 'react'
import logoBlue from 'assets/images/logo-blue.svg'
import facebook from 'assets/images/facebook.svg'
import twitter from 'assets/images/twitter.svg'
import instagram from 'assets/images/instagram.png'
import youtube from 'assets/images/youtube.png'
import Newsletter from 'common/Newsletter'
import './LandingBottom.css'

export const LandingBottom = () => (
  <div className='container landing-bottom'>
    <div className='row'>
      <div className='col-5'>
        <div className='copyright'>
          <span className='small-text'>© 2018 OneBigApp Limited. All Rights Reserved.</span>
        </div>
        <div className='social-icons'>
          <ul>
            <li><img src={facebook} alt='facebook icon' /></li>
            <li><img src={twitter} alt='twitter icon' /></li>
            <li><img src={instagram} alt='instagram icon' /></li>
            <li><img src={youtube} alt='youtube icon' /></li>
          </ul>
        </div>
      </div>
      <div className='col text-center logo-bottom'><img src={logoBlue} alt='oneapp blue logo' /></div>
      <div className='col-5'>
        <Newsletter />
      </div>
    </div>
  </div>
)

export default LandingBottom
