import React from 'react'
import UserPage from './UserPage'
import { ActiveJobs } from '../components/CompanyActiveJobs'
import './LoginPage.css'
import { GET_EMPLOYER } from '../../services/queries';
import { graphql } from 'react-apollo';

class ActiveJobsPage extends React.Component {

  componentDidMount() {
    this.props.data.refetch();
  }

  render() {
    const { data, loading } = this.props;
    return (<React.Fragment>
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

    </React.Fragment>)
  }
}

export default graphql(GET_EMPLOYER, {
  options: (props) => ({ variables: { id: props.user } })
})(ActiveJobsPage);