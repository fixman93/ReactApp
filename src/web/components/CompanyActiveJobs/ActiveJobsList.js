import React from 'react'
import JobPosting from '../common/JobPosting'

export const ActiveJobsList = () => (
  <div>
    <JobPosting
      title='Full Stack Developer'
      postedAt='Posted on 28/11/2017'
    />
    <JobPosting
      title='UX Designer'
      postedAt='Posted on 22/07/2017'
    />
  </div>
)

export default ActiveJobsList