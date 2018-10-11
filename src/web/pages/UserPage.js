import React from 'react'
import UserHeader from 'common/UserHeader'
import FeaturedTitle from 'common/FeaturedTitle'
import PropTypes from 'prop-types'

const UserPage = ({ heading, children, match }) => (
  <div className='login-page'>
    <div className='container'>
      <UserHeader match={match} />
      <FeaturedTitle
        title={heading.title}
        desc={heading.desc}
        color={heading.color}
      />
      {children}
    </div>
  </div>
)

UserPage.propTypes = {
  heading: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    color: PropTypes.string
  })
}

export default UserPage