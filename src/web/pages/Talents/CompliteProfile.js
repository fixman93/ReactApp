import React, { Component } from 'react'
import UserTalent from '../UserTalent'
import TalentHeader from '../../../common/TalentHeader'

export class CompliteProfile extends Component {
    render() {
        return (
            <UserTalent
                heading={{
                    title: 'Complete your profile ',
                    desc: 'We need to capture your needs to macth you with jobs accurately.',
                    color: 'white'
                }}
            >
            </UserTalent>
        )
    }
}

export default CompliteProfile