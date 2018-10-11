import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ReqItem from './ReqItem'
import './Requirements.css'

const Requirements = ({ data }) => (
  <Fragment>
    <h3>Requirements</h3>
    <div className='req-container'>
      {data.map((item, index) => (
        <ReqItem key={index} data={item} />
      ))}
    </div>
  </Fragment>
)

Requirements.propTypes = {
  data: PropTypes.array.isRequired
}

export default Requirements