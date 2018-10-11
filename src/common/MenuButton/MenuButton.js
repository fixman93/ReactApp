import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './MenuButton.css'

export const MenuButton = ({ path, name, match }) => (
  <div className={'menu-button' + (match.path === path ? ' active' : '')}>
    <Link to={path}>{name}</Link>
  </div>
)

MenuButton.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired
}

export default withRouter(MenuButton)
