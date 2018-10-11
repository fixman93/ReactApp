import React from 'react'
import PropTypes from 'prop-types'
import './Error.css'

export const ErrorMessage = ({ message }) => {
  console.log(message)
  return <p className="error-text">{message}</p>
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default ErrorMessage