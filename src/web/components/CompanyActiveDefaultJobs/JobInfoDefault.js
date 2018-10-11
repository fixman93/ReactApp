import React from 'react'
import PropTypes from 'prop-types'

const JobInfoTag = ({imgSrc, text}) => (
  <li className='info-tag'>
    <img
      src={imgSrc}
      className='info-tag-img'
      alt='...' />
    <span>{text}</span>
  </li>
)

JobInfoTag.propTypes = {
  imgSrc: PropTypes.string,
  text: PropTypes.string.isRequired
}

export default JobInfoTag
