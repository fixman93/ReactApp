import React from 'react'
import UserPage from './UserPage'
import { ActiveJobsDefault } from '../components/CompanyActiveDefaultJobs'
import './LoginPage.css'

export const ActiveJobsPage = ({ user }) => (
  <UserPage
    heading={{
      title: 'Welcome Sarah!',
      desc: 'View your jobs, explore talent and create new jobs',
      color: 'white'
    }}
  >
    <ActiveJobsDefault />
  </UserPage>
)

export default ActiveJobsPage