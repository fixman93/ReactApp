import React from 'react'
import {Link} from 'react-router-dom'
import whiteLogo from 'assets/images/logo-white.svg'

export const DefaultHeader = ({ children }) => (
  // <div className='menu-header row'>
  //   <div className='col'>
  //     <Link className='logo' to='/'><img src={whiteLogo} alt='OneApp Logotype' /> <span>OneApp</span></Link>
  //   </div>
  //   {children}
  // </div>
  <div className='menu-header row'>
    <div className='col'>
      <Link className='logo' to='/'><img src={whiteLogo} alt='OneApp Logotype' /></Link>
    </div>
    <div className='col-4'></div>
    <div className='col btn-holder text-right'>
      <Link to='/company/profile' className='btn btn-outlined'>Save for later</Link>
    </div>
    {children}
  </div>
)

export default DefaultHeader