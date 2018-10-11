import React from 'react'
import UserPage from './UserPage'
import { CompanyInfo } from '../components/CompanyInformation'

export const CompanyProfile = ({ user }) => (
  <UserPage
    heading={{
      title: 'Edit your profile',
      desc: 'Tell us more about the company. This will apply to all your jobs.',
      color: 'white'
    }}
  >
  <CompanyInfo />
  </UserPage>
)

export default CompanyProfile