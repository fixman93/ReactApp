import React from 'react'
import PropTypes from 'prop-types'
import './StepButton.css'

const StepButton = ({ 
  activeId,
  id,
  text,
 }) => (
  <button
    type='button'
    className={
      `btn btn-outline-orange ${ activeId === id ?
        'active' :
        ''}`.trim()
    }
  >
    {text}
  </button>
)

StepButton.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  activeId: PropTypes.number.isRequired
}

export default StepButton