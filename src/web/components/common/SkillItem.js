import React from 'react'
import PropTypes from 'prop-types'
import './SkillItem.css'

const SkillItem = ({ text }) => (
  <p
    className='skill-item'
  >
    {text}
  </p>
)

SkillItem.propTypes = {
  text: PropTypes.string.isRequired
}

export default SkillItem