import React from 'react'
import UserPage from './UserPage'
import AllAplications from '../components/AllAplications'
import './LoginPage.css'

export const AllAplicationsPage = ({ user }) => (
  <UserPage
    heading={{
      title: 'Welcome Sarah!',
      desc: 'View your jobs, explore talent and create new jobs',
      color: 'white'
    }}
  >
    <AllAplications />
    <div className="bottomText">
      <p>Shortlist or reject talents to see more. You can only see 10 talents at a time.</p>
      <button>Why only 10?</button>
    </div>
  </UserPage>
)

export default AllAplicationsPage