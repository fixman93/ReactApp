import React from 'react'
import { withRouter } from 'react-router-dom'
import TalentHeader from '../../common/TalentHeader'
import FeaturedTitle from 'common/FeaturedTitle'
import PropTypes from 'prop-types'



const UserTalent = ({ heading, children, match, CompliteProfileClass }) => (

  <div className={'talent-page ' + CompliteProfileClass}>
    <div className={
      match.path === '/talent/complite-profile'
        ? 'container-fluid'
        : 'container'
    }>
      <TalentHeader match={match} />
      <FeaturedTitle
        title={heading.title}
        desc={heading.desc}
        color={heading.color}
      />
      {children}
    </div>
  </div>
)

UserTalent.propTypes = {
  heading: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    color: PropTypes.string
  })
}

export default withRouter(UserTalent)