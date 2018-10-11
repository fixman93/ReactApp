import React from 'react'
import PropTypes from 'prop-types'
import JobInfoDefault from './JobInfoDefault'
import ProfessionList from '../../components/ProfessionList'
import pound from 'assets/images/Company/fill-1.svg'


const JobPostingDefault = ({imgSrc}) => (
    <ProfessionList />
)

JobPostingDefault.propTypes = {
    imgSrc: PropTypes.string
  }
  
  export default JobPostingDefault