import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import MenuHeader from 'common/MenuHeader/'
import LandingTop from './components/LandingTop'
// import Ednos from './components/Ednos'
import LandingBottom from './components/LandingBottom'
import SignupBanner from './components/SignupBanner'
import './TalentLanding.css'
import PreparationBanner from './components/PreparationBanner';
import ApplicationBanner from './components/ApplicationBanner';
import InterviewsBanner from './components/InterviewsBanner';
import BottomBoxes from './components/BottomBoxes';

export class TalentLanding extends Component {
  render() {
    return (
      <div>
        <LandingTop match={this.props.match}>
          <MenuHeader match={this.props.match} />
        </LandingTop>
        <SignupBanner />
        <PreparationBanner />
        <ApplicationBanner />
        <InterviewsBanner />
        <BottomBoxes />
        {/*<Ednos />*/}
        <LandingBottom />
      </div>
    )
  }
}

TalentLanding.propTypes = {
  match: PropTypes.object.isRequired
}

export default TalentLanding
