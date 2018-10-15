import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuButton from 'common/MenuButton'
import { withRouter } from 'react-router-dom'
import { Link } from "react-router-dom"
import Steps from './Steps'
import RegisterSteps from './RegisterSteps'
import whiteLogo from 'assets/images/logo-white.svg'
import blueLogo from 'assets/images/logo-blue.svg'
import CompanyLogo from '../../assets/images/userProfile.png'
import './TalentHeader.css'

export class TalentHeader extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        activeId: PropTypes.number.isRequired
    }

    static defaultProps = {
        activeId: 1
    }

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
        const { match, activeId } = this.props
        if (this.state.userId) {
            return (
                <div className='menu-header  TalentHeader'>
                    <div className='container'>
                        <div className="row">
                            <div className='col'>
                                <Link
                                    className='logo'
                                    to='/'>
                                    {match.path === '/talent/register' ||
                                        match.path === '/talent/profile' ||
                                        match.path === '/talent/complite-registration' ? (
                                            <img src={whiteLogo} alt='OneApp Logo' />
                                        ) : <img src={blueLogo} alt='OneApp Logo' />}
                                </Link>{/*  <span>OneApp</span> if you want to use logo text */}
                            </div>
                            <div className='col-6 text-center'>
                                {
                                    match.path === '/talent/register'
                                    && (
                                        <Steps activeId={activeId} />
                                    )}
                                {
                                    match.path === '/talent/complite-registration'
                                    && (
                                        <RegisterSteps activeId={activeId} />
                                    )}
                            </div>
                            {
                                match.path === '/talent/complite-profile'
                                    ? (
                                        <div className='col btn-holder text-right'>
                                            <ul>
                                                <li>
                                                    {match.path === '/talent/register' ? (
                                                        <Link className='btn btn-close' to='/'>close</Link>
                                                    ) : <MenuButton path='/' name='Complete Profile' match={this.props.match} />}
                                                </li>
                                            </ul>
                                        </div>
                                    ) :
                                    <div className="col">
                                        <div className="activeUser">
                                            <div className="userDropdown">
                                                <img src={CompanyLogo} onClick={this.handleMenu} alt="User Logo" />

                                                {this.state.show && (
                                                    <ul>
                                                        <li><Link to="/talent/profile">Edit Account</Link></li>
                                                        <li><Link to="/login" onClick={() => this.logout()}>Log Out</Link></li>
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='menu-header  TalentHeader'>
                    <div className='container'>
                        <div className="row">
                            <div className='col'>
                                <Link
                                    className='logo'
                                    to='/'>
                                    {match.path === '/talent/register' ||
                                        match.path === '/talent/profile' ? (
                                            <img src={whiteLogo} alt='OneApp Logo' />
                                        ) : <img src={blueLogo} alt='OneApp Logo' />}
                                </Link>{/*  <span>OneApp</span> if you want to use logo text */}
                            </div>
                            <div className='col-6 text-center'>
                                {
                                    match.path === '/talent/register'
                                    && (
                                        <Steps activeId={activeId} />
                                    )}
                            </div>
                            {
                                match.path === '/talent/complite-profile' ||
                                    match.path === '/talent/register'
                                    ? (
                                        <div className='col btn-holder text-right'>
                                            <ul>
                                                <li>
                                                    {match.path === '/talent/register' ? (
                                                        <Link className='btn btn-close' to='/'>close</Link>
                                                    ) : <MenuButton path='/' name='Complete Profile' match={this.props.match} />}
                                                </li>
                                            </ul>
                                        </div>
                                    ) :
                                    <div className="col">

                                    </div>
                            }
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default withRouter(TalentHeader)
