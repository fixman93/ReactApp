import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import Steps from './Steps'
import whiteLogo from 'assets/images/logo-white.svg'
import { withRouter } from 'react-router-dom'
import './PostHeader.css'

export class PostHeader extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    activeId: PropTypes.number.isRequired
  }

  static defaultProps = {
    activeId: 1
  }

  render() {
    const { match, activeId } = this.props
    return (
      <div className='postHeader menu-header row'>
        <div className='col'>
          <Link className='logo' to='/'><img src={whiteLogo} alt='OneApp Logotype' /></Link>
        </div>
        <div className='col-6 text-center'>
          {match.path === '/company/post/create' && (
            <Steps activeId={activeId} />
          )}
        </div>
        <div className='col btn-holder text-right'>
          <Link className="btn btn-close" to="">
            Close
          </Link>
          {/* <Link to={`/user/${user.id}`} className='btn btn-outlined'>Log In</Link> */}
        </div>
      </div>
    )
  }
}

export default withRouter(PostHeader)