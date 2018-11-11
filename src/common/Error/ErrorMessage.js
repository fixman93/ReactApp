import React from 'react'
import PropTypes from 'prop-types'
import errorIcon from '../../assets/images/icons/error.png'
import './Error.css'

export const ErrorMessage = ({ message }) => {

  return <p className="error-text">
    <img className="error" src={errorIcon} alt='error-icon' />{message}</p>
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default ErrorMessage