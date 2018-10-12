import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuButton from 'common/MenuButton'
import { withRouter } from 'react-router-dom'
import { Link } from "react-router-dom"
import Steps from './Steps'
import whiteLogo from 'assets/images/logo-white.svg'
import blueLogo from 'assets/images/logo-blue.svg'
import './TalentHeader.css'

export class TalentHeader extends Component {
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
            <div className='menu-header  TalentHeader'>
                <div className='container'>
                    <div className="row">
                        <div className='col'>
                            <Link
                                className='logo'
                                to='/'>
                                {match.path === '/talent/register' ? (
                                    <img src={whiteLogo} alt='OneApp Logo' />
                                ) : <img src={blueLogo} alt='OneApp Logo' />}
                            </Link>{/*  <span>OneApp</span> if you want to use logo text */}
                        </div>
                        <div className='col-6 text-center'>
                            {match.path === '/talent/register' && (
                                <Steps activeId={activeId} />
                            )}
                        </div>
                        <div className='col btn-holder text-right'>
                            <ul>
                                <li>
                                    {match.path === '/talent/register' ? (
                                        <Link className='btn btn-close' to='/'>close</Link>
                                    ) : <MenuButton path='/' name='Complete Profile' match={this.props.match} />}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(TalentHeader)
