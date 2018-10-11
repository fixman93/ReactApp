import React from 'react'
import PropTypes from 'prop-types'
import question from 'assets/images/question.svg'

const DaysLeft = ({ text }) => (
  <small>
    <span>
      <img
        src={question}
        style={{
          width: 18,
          height: 18
        }}
        alt=''
      />
    </span>
    {text}
  </small>
)

DaysLeft.propTypes = {
  text: PropTypes.string.isRequired
}

export default DaysLeft