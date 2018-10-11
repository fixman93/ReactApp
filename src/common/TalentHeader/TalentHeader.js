import React, { Component } from 'react'
import MenuButton from 'common/MenuButton'
import { withRouter } from 'react-router-dom'
import { Link } from "react-router-dom"
import whiteLogo from 'assets/images/logo-white.svg'
import blueLogo from 'assets/images/logo-blue.svg'
import  './TalentHeader.css'

export class TalentHeader extends Component {
    render() {
        const {match} = this.props
        return (
            <div className='menu-header  TalentHeader'>
                <div className='container'>
                    <div className="row">
                        <div className='col'>
                            <Link
                            className='logo'
                            to='/'><img src={blueLogo}
                            alt='OneApp Logotype'
                            />
                            </Link>{/*  <span>OneApp</span> if you want to use logo text */}
                        </div>
                        <div className='col-6 text-center'></div>
                        <div className='col btn-holder text-right'>
                            <ul>
                                <li><MenuButton path='/' name='Complete Profile' match={this.props.match} /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(TalentHeader)
