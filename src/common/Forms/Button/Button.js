import React from 'react'
import PropTypes from 'prop-types'

export const Button = ({text, className, count}) => {
  return (
    <button
      className={`btn ${className}`.trim()}
    >
      {text}
      {Number.isInteger(count) && (
        <span className="btn-count">{count}</span>
      )}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  count: PropTypes.number
}

export default Button
