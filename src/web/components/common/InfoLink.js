import React from 'react'
import PropTypes from 'prop-types'
import './InfoLink.css'

const InfoLink = ({ imgSrc, text }) => (
  <p className='info-link'>
    <img
      src={imgSrc}
      className=''
      alt=''
    />
    {text}
  </p>
)

InfoLink.propTypes = {
  imgSrc: PropTypes.string,
  text: PropTypes.string.isRequired
}

export default InfoLink