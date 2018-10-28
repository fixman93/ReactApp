import React from 'react'
import UserPage from './UserPage'
import { ActiveJobs } from '../components/CompanyActiveJobs'
import './LoginPage.css'
import { Query } from 'react-apollo';
import { GET_EMPLOYER } from '../../services/queries';

export const ActiveJobsPage = ({ user, match }) => (
  <Query query={GET_EMPLOYER} variables={{ id: 'RW1wbG95ZXJOb2RlOjIw' }}>
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
  </Query >
)

export default ActiveJobsPage