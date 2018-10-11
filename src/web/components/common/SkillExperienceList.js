import React from 'react'
import PropTypes from 'prop-types'
import SkillExperienceItem from './SkillExperienceItem'
import star from './../../../assets/images/Company/star.png'
import star_gray from './../../../assets/images/Company/star_1.png'
import './SkillExperienceList.css'


const SkillExperienceList = ({ onExperienceClick }) => (
  <ul className='skill-list-container centered'>
    <SkillExperienceItem
      text='Novice'
      image1={star}
      image2={star_gray}
      image3={star_gray}
      desc='Limited experience'
      onExperienceClick={onExperienceClick}
    />
    <SkillExperienceItem
      text='Intermediate'
      image1={star}
      image2={star}
      image3={star_gray}
      desc='Commercial experience'
      onExperienceClick={onExperienceClick}
    />
    <SkillExperienceItem
      text='Expert'
      image1={star}
      image2={star}
      image3={star}
      desc='A highly developed skill'
      onExperienceClick={onExperienceClick}
    />
  </ul>
)

SkillExperienceList.propTypes = {
  onExperienceClick: PropTypes.func.isRequired
}

export default SkillExperienceList