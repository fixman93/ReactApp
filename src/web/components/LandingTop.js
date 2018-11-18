import React from 'react'
import PropTypes from 'prop-types'
import girl from 'assets/images/landing1.jpg'
import boyCompany from 'assets/images/boy-looki-g-up@2x.png'
import './LandingTop.css';

export const LandingTop = ({ children, match }) => {
  const isTalent = match.path === '/'
  const className = isTalent ? 'talent' : 'company'
  const text = isTalent ? `<span>Be matched with jobs<br />
    that meet your criteria<br /><strong>not somebody else’s</strong></span>`
    : `<span><strong>Need to fill jobs quickly?</strong><br /> Hire with AI, video profiles<br /> & timelines</span>`
  return (
    <div className={'landing-top ' + className}>
      <div className='container'>
        {children}
      </div>
      {
        isTalent ?
          (
            <div className="landing-flex container">
              <h1 dangerouslySetInnerHTML={{ __html: text }}></h1>
              <div className='radar'>
                <img src={girl} alt="girl-graph" />
              </div>
            </div>
          ) :
          (
            <React.Fragment>
              <div className='company-text'>
                <h1>{text}</h1>
                <button className='btn btn-white'>Are you hiring?</button>
              </div>
              <div className='company-application'>
                <img src={boyCompany} alt="a boy looking up" width='439px' />
              </div>
            </React.Fragment>
          )
      }

    </div>
  )
}

LandingTop.propTypes = {
  children: PropTypes.object,
  match: PropTypes.object.isRequired
}

export default LandingTop
