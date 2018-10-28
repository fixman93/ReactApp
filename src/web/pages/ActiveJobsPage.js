import React from 'react'
import UserPage from './UserPage'
import { ActiveJobs } from '../components/CompanyActiveJobs'
import './LoginPage.css'
import { Query } from 'react-apollo';
import { GET_EMPLOYER } from '../../services/queries';

export const ActiveJobsPage = ({ user, match }) => {
  console.log(user)
  return (<Query query={GET_EMPLOYER} variables={{ id: user }}>
    {({ data, loading, error }) => {
      return <React.Fragment>
        < UserPage
          heading={{
            title: 'Welcome Sarah!',
            desc: 'View your jobs, explore talent and create new jobs',
            color: 'white'
          }}
        >
          {data && <ActiveJobs data={data} />}
          {loading && <h1>loading...</h1>}

        </UserPage>

      </React.Fragment>
    }}
  </Query >)
}

export default ActiveJobsPage