import React from 'react'
import PropTypes from 'prop-types'
import './PostPage.css'

const PostPage = ({ heading, children, match }) => (
  <div className='post-page'>
    <div className='container'>
      {children}
    </div>
  </div>
)

PostPage.propTypes = {
  heading: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    color: PropTypes.string
  })
}

export default PostPage