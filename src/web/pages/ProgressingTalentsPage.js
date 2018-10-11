import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserPage from './UserPage'
import { TalentList } from '../components/ProgressingTalent'


export class ProgressingTalent extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render () {
    return (
      <UserPage
        heading={{
          title: '4 talents in progress',
          desc: 'See candidates in progress, track, interview and hire',
          color: 'white'
        }}
      >
        <TalentList />
      </UserPage>
    )
  }
}

export default ProgressingTalent
