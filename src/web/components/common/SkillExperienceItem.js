import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SkillExperienceList.css'

class SkillExperienceItem extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onExperienceClick: PropTypes.func.isRequired,
    desc: PropTypes.string.isRequired,
  }
  
  render () {
    const { text, onExperienceClick, desc, image1, image2, image3 } = this.props
    return (
      <div className='radio-input-container centered'>
        <input
          id={text}
          type='radio'
          onChange={() => onExperienceClick(text)}
        />
        <label htmlFor={text} className='skill-experience-group'>
          {text} 
          <img src={image1} alt="..." />
          <img src={image2} alt="..." />
          <img src={image3} alt="..." />
          <span className='skill-experience-group-desc'>{desc}</span>
        </label>
        
      </div>
    )
  }
}

export default SkillExperienceItem
