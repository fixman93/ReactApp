import React from 'react'
import PropTypes from 'prop-types'
import kidDeveloper from 'assets/images/kid-with-maginifier@3x.png'
import kidDesigner from 'assets/images/main-boy-with-paint@3x.png'
import boyCompany from 'assets/images/boy-looki-g-up@2x.png'

export const LandingTop = ({children, match}) => {
  const isTalent = match.path === '/'
  const className = isTalent ? 'talent' : 'company'
  const text = isTalent ? <span>Be matched with jobs<br />
    that meet your criteria<br /><strong>not somebody else’s</strong></span>
  : <span><strong>Need to fill jobs quickly?</strong><br /> Hire with AI, video profiles<br /> & timelines</span>
  return (
    <div className={'landing-top ' + className}>
      <div className='container'>
        {children}
      </div>
      {
        isTalent ?
        (
          <React.Fragment>
            <h1 className='text-center'>{text}</h1>
            <div className='designer-application'>
              <img src={kidDesigner} alt="a boy with painted hands" width='407.5px' height='420px' />
              <button className='btn btn-white'>Are you a designer?</button>
            </div>
            <div className='developer-application'>
              <img src={kidDeveloper} alt="a boy holding a maginifier" width='315.3px' height='420px' />
              <button className='btn btn-white'>Are you a developer?</button>
            </div>
          </React.Fragment>
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
