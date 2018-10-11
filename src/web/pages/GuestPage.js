import React from 'react'
import PropTypes from 'prop-types'
import MenuHeader from 'common/MenuHeader'
import FeaturedTitle from 'common/FeaturedTitle'
import { withRouter } from 'react-router-dom'

const GuestPage = ({ heading, children, match }) => (
  <div className='login-page'>
    <div className='container'>
      <MenuHeader match={match} />
      <FeaturedTitle
        title={heading.title}
        desc={heading.desc}
        color={heading.color}
      />
      {children}
    </div>
  </div>
)

GuestPage.propTypes = {
  match: PropTypes.object.isRequired,
  heading: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    color: PropTypes.string
  })
}

export default withRouter(GuestPage)