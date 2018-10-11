import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import MenuHeader from 'common/MenuHeader/'
import LandingTop from './components/LandingTop'
// import Ednos from './components/Ednos'
import LandingBottom from './components/LandingBottom'
import SignupBanner from './components/SignupBanner'
import PreparationBanner from './components/PreparationBanner'
import InterviewsBanner from './components/InterviewsBanner'
import ApplicationBanner from './components/ApplicationBanner'
import SubscribeBanner from './components/SubscribeBanner'
import './CompanyLanding.css'

export class CompanyLanding extends Component {
  render () {
    return (
      <div>
        <LandingTop match={this.props.match}>
          <MenuHeader match={this.props.match} />
        </LandingTop>
        <SignupBanner />
        <PreparationBanner />
        <ApplicationBanner />
        <InterviewsBanner />
        <SubscribeBanner />
        {/*<Ednos />*/}
        <LandingBottom />
      </div>
    )
  }
}

CompanyLanding.propTypes = {
  match: PropTypes.object.isRequired
}

export default CompanyLanding
