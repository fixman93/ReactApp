import React, { Component } from 'react'
import PropTypes from 'prop-types'
import x from 'assets/images/x.svg'
import SkillExperienceList from './SkillExperienceList'

class SkillListItem extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
  }

  state = {
    experience: '',
    experienceActive: true
  }

  handleExperienceClick = async value => {
    await this.setState({
      experience: value,
      experienceActive: false
    })
    this.props.onClick()
  }

  toggleExp = () => {
    this.setState(prevState => ({
      experienceActive: !prevState.experienceActive
    }))
  }

  render() {
    const { data, onRemove, companies } = this.props
    const { experience, experienceActive } = this.state
    return data ? (
      <React.Fragment>
        <li className='skill-list-item'>
          {data.name ? data.name : data.skill}
          {' '}
          {!data.name && <span
            onClick={this.toggleExp}
            className='skill-list-span'
          >
            {experience || 'Select level'}
          </span>}
          <span
            onClick={() => onRemove(data.name ? data.name : data.skill)}
          >
            <img src={x} alt='' />
          </span>
        </li>
        {(experienceActive && !companies) ? (
          <SkillExperienceList
            onExperienceClick={this.handleExperienceClick}
          />
        ) : this.props.onClick}
      </React.Fragment>
    ) : null
  }
}

export default SkillListItem