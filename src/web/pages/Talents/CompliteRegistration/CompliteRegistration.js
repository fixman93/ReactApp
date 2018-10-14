import React, { Component } from 'react'
import UserTalent from '../../UserTalent'
import './CompliteRegistration.css'

export class CompliteProfile extends Component {
  render() {
    return (
      <UserTalent
        heading={{
          title: 'Your current situation',
          desc: '',
          color: 'white'
        }}
        CompliteProfileClass='TalentComplete-Registration'
      >

      </UserTalent>
    )
  }
}

export default CompliteProfile