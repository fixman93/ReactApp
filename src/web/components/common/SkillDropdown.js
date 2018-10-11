import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SkillDropdown.css'

class SkillDropdown extends Component {
  static propTypes = {
    skills: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    // onRemove: PropTypes.func.isRequired
  }

  render () {
    const { skills, onClick } = this.props
    return (
      <dl className='skill-group-container'>
        {skills && skills.slice(0, 6).map(item => {
          return (
            <dd
              key={item.node.id}
              value={item.node.skill}
              onClick={() => onClick(item)}
              className='skill-group-item'
            >
              {item.node.skill}
            </dd>
          ) 
        })}
      </dl>
    )
  }
}

export default SkillDropdown