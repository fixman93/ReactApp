import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

export const FeaturedTitle = ({ title, desc, color, match }) => (
  <div className={'featured-title text-center title-' + color}>
    <h3>{title}</h3>
    {desc && <p>{desc}</p>}
    { match.path === '/talent/complite-profile' ? 
      <div className="UserCompleted">
        <h4>33%</h4>
        <span>Completed</span>
      </div> : null
  
    }
  </div>
)

FeaturedTitle.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  color: PropTypes.string
}

export default withRouter(FeaturedTitle)
