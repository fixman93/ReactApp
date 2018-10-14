import React from 'react'
import PropTypes from 'prop-types'

const CheckboxItem = ({ option, onChange, defaultValue }) => (
  <div className='radio-input-container checkboxItem'>
    <input
      type='checkbox'
      id={option.id}
      name={option.name}
      value={option.value}
      onChange={() => onChange()}
      checked={option.value === defaultValue}
    />
    <label htmlFor={option.id}>
      {option.label}
    </label>
  </div>
)

CheckboxItem.propTypes = {
  options: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })
}

export default CheckboxItem