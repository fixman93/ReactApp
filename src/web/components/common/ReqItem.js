import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ReqItem = ({ data }) => (
  <Fragment>
    <img src={data.imgSrc} alt='' className='req-img' />
    <div className='req-item'>
      <small className='req-title'>{data.title}</small>
      <p className='req-value'>{data.value}</p>
    </div>
  </Fragment>
)

ReqItem.propTypes = {
  data: PropTypes.shape({
    imgSrc: PropTypes.string,
    title: PropTypes.string.isRequired,
    value: PropTypes.string
  })
}

export default ReqItem