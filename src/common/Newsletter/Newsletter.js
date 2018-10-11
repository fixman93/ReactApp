import React from 'react'
import './Newsletter.css'

export const Newsletter = () => (
  <div className='newsletter-component'>
    <div className='email-input float-left'>
      <input type='text' placeholder='Enter email now' />
    </div>
    <div className='email-send float-left'>
      <input type='button' value='Join Newsletter' />
    </div>
  </div>
)

export default Newsletter
