import React from 'react'
import PostPage from './PostPage'
import FeaturedTitle from 'common/FeaturedTitle'
import PostHeader from 'common/PostHeader'
import { JobPostLanding } from '../components/CompanyPostJobsLanding/'
import './LoginPage.css'

export const PostLanding = () => (
  <PostPage>
    <PostHeader />
    <FeaturedTitle
          title='Set up your payment to post jobs'
          desc='Remember before you can post a job you need to set up your payment'
          color='white'
    />
    <JobPostLanding />
  </PostPage>
)

export default PostLanding