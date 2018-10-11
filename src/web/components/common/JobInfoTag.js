import React from 'react'
import PropTypes from 'prop-types'
import './JobInfoTag.css'

const JobInfoTag = ({ imgSrc, text, color }) => (
  <div className='info-tag'>
    <p className='info-text'>
      <span>
        <img
          src={imgSrc}
          className='info-tag-img'
          alt=''
        />
      </span>
      {text}
    </p>
  </div>
)

JobInfoTag.propTypes = {
  text: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  color: PropTypes.string
}

export default JobInfoTag
