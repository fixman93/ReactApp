import React from 'react'
import UserPage from './UserPage'
import { ActiveJobs } from '../components/CompanyActiveJobs'
import './LoginPage.css'

export const ActiveJobsPage = ({user, match}) => (
  <UserPage
    heading={{
      title: 'Welcome Sarah!',
      desc: 'View your jobs, explore talent and create new jobs',
      color: 'white'
    }}
  >
    <ActiveJobs />
  </UserPage>
)

export default ActiveJobsPage