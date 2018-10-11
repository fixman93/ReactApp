import React, {Component} from 'react'
import PropTypes from 'prop-types'
import UserPage from './UserPage'
import { TalentList } from '../components/ProgressingTalent'


export class RejectedTalentsPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render () {
    return (
      <UserPage
        heading={{
          title: 'Unsuccessful Talent',
          desc: 'See your rejected talent',
          color: 'white'
        }}
      >
        <TalentList />
      </UserPage>
    )
  }
}

export default RejectedTalentsPage
