import React from 'react'
import PropTypes from 'prop-types'

const RadioItem = ({ option, onChange, defaultValue }) => (
  <div className='radio-input-container'>
    <input
      type='radio'
      id={option.id}
      name={option.name}
      value={option.value}
      onChange={() => onChange(option.value)}
      checked={option.value === defaultValue}
    />
    <label htmlFor={option.id}>
      {option.label}
    </label>
  </div>
)

RadioItem.propTypes = {
  options: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })
}

export default RadioItem