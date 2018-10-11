import React from 'react'
import PropTypes from 'prop-types'
import SkillListItem from './SkillListItem'
import './SkillList.css'

const SkillList = ({ skills, onRemove, onClick }) => skills ? (
  <ul className='skill-list-container'>
    {skills.map(item => (
      <SkillListItem
        key={item.id}
        data={item}
        onClick={onClick}
        onRemove={onRemove}
      />
    ))}
  </ul>
) : null

SkillList.propTypes = {
  skills: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default SkillList