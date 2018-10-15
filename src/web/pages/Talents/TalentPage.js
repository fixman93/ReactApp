import React from 'react'
import PropTypes from 'prop-types'
import './TalentPage.css'

const PostPage = ({ heading, children, match }) => (
  <div className='login-page talent-page'>
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