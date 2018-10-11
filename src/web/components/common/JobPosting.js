import React from 'react'
import PropTypes from 'prop-types'
import Button from 'common/Forms/Button'
import UIContainer from 'common/UIContainer'
import JobInfoTag from './JobInfoTag'
import pound from 'assets/images/pound.svg'
import './JobPosting.css'


const JobPosting = ({ title, postedAt, imgSrc }) => (
  <UIContainer>
    <div className='col job-posting'>
      <div className='row'>
        <img src={imgSrc} alt='' />
        <div className='job-info'>
          <p>{title} &gt;</p>
          <small>{postedAt}</small>
        </div>
        <Button
          className='btn-orange'
          text='New Talents'
          count={0}
        />
      </div>
      <hr />
      <div className='row'>
        <JobInfoTag imgSrc={pound} text='82,000 per annum' />
        <JobInfoTag text='3 interview stages' />
        <JobInfoTag text='London Bridge, London' />
        <div className="job-btn-container">
          <Button
            className='btn-green text-bold'
            text='Progressing'
            count={0}
          />
          <Button
            className='btn-red text-bold'
            text='Rejected'
            count={0}
          />
        </div>
      </div>
    </div>
  </UIContainer>
)

JobPosting.propTypes = {
  title: PropTypes.string.isRequired,
  postedAt: PropTypes.string,
  imgSrc: PropTypes.string
}

export default JobPosting