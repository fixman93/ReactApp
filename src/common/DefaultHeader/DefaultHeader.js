import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import whiteLogo from 'assets/images/logo-white.svg'
import blueLogo from 'assets/images/logo-blue.svg'

export const DefaultHeader = ({ children, match }) => (
  // <div className='menu-header row'>
  //   <div className='col'>
  //     <Link className='logo' to='/'><img src={whiteLogo} alt='OneApp Logotype' /> <span>OneApp</span></Link>
  //   </div>
  //   {children}
  // </div>
  <div className='menu-header row'>
    <div className='col'>
      <Link className='logo' to='/'>
        {
          match.path === '/talent/email' || match.path === '/company/email' ? (
            <img src={blueLogo} alt='OneApp Logotype' />
          ) : <img src={whiteLogo} alt='OneApp Logotype' />
        }
      </Link>
    </div>
    <div className='col-4'></div>
    <div className='col btn-holder text-right'>
      {
        match.path === '/talent/email' || match.path === '/company/email' ? (
          null
        ) : <Link to='/company/profile' className='btn btn-outlined'>Save for later</Link>
      }

    </div>
    {children}
  </div>
)

export default withRouter(DefaultHeader)