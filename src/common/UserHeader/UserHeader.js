import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import whiteLogo from 'assets/images/logo-white.svg'
import MenuButton from 'common/MenuButton'
import { withRouter } from 'react-router-dom'
import CompanyLogo from '../../assets/images/Company/1@3x.png'
import './UserHeader.css'


export class UserHeader extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     show: false
  //   }
  // }

  // this can be changed with:

  state = {
    show: false,
    userId: ''
  }

  handleMenu = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }))
  }

  logout() {
    localStorage.clear()
  }

  render() {
    const { match } = this.props

    return (
      <div className='menu-header row'>
        <div className='col'>
          <Link className='logo' to='/'><img src={whiteLogo} alt='OneApp Logotype' /></Link>
        </div>
        <div className='col-6 text-center'>
          <ul>
            <li><MenuButton path='/company/jobs/active' name='Active' match={match} /></li>
            <li><MenuButton path='/company/jobs' name='Filled' match={match} /></li>
          </ul>
        </div>
        <div className='col btn-holder text-right'>
          <div className="activeUser">
            <Link className="btn btn-white" to="/company/post/create">
              Post Job
            </Link>
            <div className="userDropdown">
              <img src={CompanyLogo} onClick={this.handleMenu} alt="User Logo" />
              {this.state.show && (
                <ul>
                  <li><Link to="/company/profile">Edit Account</Link></li>
                  <li><Link to="/company/post">Payments</Link></li>
                  <li><Link to="/login" onClick={() => this.logout()}>Log Out</Link></li>
                </ul>
              )}
            </div>
          </div>
          {/* <Link to={`/user/${user.id}`} className='btn btn-outlined'>Log In</Link> */}
        </div>
      </div>
    )
  }
}

UserHeader.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(UserHeader)