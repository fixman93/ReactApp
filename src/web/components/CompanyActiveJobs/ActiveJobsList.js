import React from 'react'
import JobPosting from '../common/JobPosting'

const ActiveJobsList = ({ data: { employer } }) => {
  return (<div>
    {employer && employer.jobofferSet.edges.map(job => {
      return <JobPosting
        key={job.node.id}
        address={employer.address}
        title={job.node.role.name}
        remuneration={job.node.remuneration}
        interviewStages={job.node.interviewStages}
      />
    })}
  </div>);
}

export default ActiveJobsList