import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import whiteLogo from 'assets/images/logo-white.svg'
import DefaultHeader from 'common/DefaultHeader'
import MenuButton from 'common/MenuButton'
import CompanyLogo from '../../assets/images/Company/1@3x.png'
import './MenuHeader.css'

export class MenuHeader extends Component {

  state = {
    show: false,
    userId: ''
  }

  handleMenu = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }))
  }

  componentDidMount = () => {
    this.setState({
      userId: localStorage.getItem('userId')
    })
  }

  logout() {
    localStorage.clear()
  }
  render() {
    const { match } = this.props
    if (match.path === '/' || match.path === '/company-landing') {
      return (
        <div className='menu-header row'>
          <div className='col'>
            <Link
              className='logo'
              to='/'><img src={whiteLogo}
                alt='OneApp Logotype'
              />
            </Link>{/*  <span>OneApp</span> if you want to use logo text */}
          </div>
          <div className='col-6 text-center'>
            {
              !this.state.userId ? (
                <ul>
                  <li><MenuButton path='/' name='Talent' match={this.props.match} /></li>
                  <li><MenuButton path='/company-landing' name='Company' match={this.props.match} /></li>
                </ul>
              ) : null
            }
          </div>
          <div className='col btn-holder text-right'>

            {
              this.state.userId ? (
                <div>
                  <div className="activeUser">
                    {/* <Link to='/login' className='btn btn-outlined' onClick={() => this.logout()}>Log Out</Link> */}
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
                </div>
              ) : <span>
                  <Link
                    className="btn btn-white"
                    to={
                      match.path === '/company-landing'
                        ? '/company/register'
                        : '/talent/register'
                    }
                  >
                    {match.path === '/company-landing'
                      ? 'Company Sign Up'
                      : 'Talent Sign Up'
                    }
                  </Link>
                  <Link
                    className='btn btn-outlined'
                    to={
                      match.path === '/company-landing'
                        ? '/login'
                        : '/talent/login'
                    } >Log In</Link>
                </span>
            }

          </div>
        </div>
      )
    } else if (match.path === '/login') {
      return (
        <div className='menu-header row'>
          <div className='col'>
            <Link className='logo' to='/'><img src={whiteLogo} alt='OneApp Logotype' /></Link>
          </div>
          <div className='col-4'></div>
          <div className='col btn-holder text-right'>
            <span>Don't have an account?</span>
            <Link to='/company/register' className='btn btn-outlined'>Sign Up</Link>
          </div>
        </div>
      )
    } else {
      return <DefaultHeader />
    }
  }
}

MenuHeader.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(MenuHeader)
